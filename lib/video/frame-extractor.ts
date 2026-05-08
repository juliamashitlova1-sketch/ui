/**
 * Browser-side frame extraction from video files using Canvas API.
 * Runs entirely in the browser — no server-side FFmpeg needed.
 */

export type ExtractedFrame = {
  timestamp: number  // seconds
  blob: Blob
  dataUrl: string
}

/**
 * Extract frames from a video file at sample timestamps.
 * Uses an offscreen <video> element and Canvas 2D API.
 */
export function extractFrames(
  file: File,
  timestamps: number[]
): Promise<ExtractedFrame[]> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.muted = true
    video.playsInline = true
    video.preload = 'auto'

    const url = URL.createObjectURL(file)
    video.src = url

    video.onloadedmetadata = () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth || 1280
      canvas.height = video.videoHeight || 720
      const ctx = canvas.getContext('2d')!
      const frames: ExtractedFrame[] = []
      let index = 0

      function seekNext() {
        if (index >= timestamps.length) {
          video.pause()
          URL.revokeObjectURL(url)
          resolve(frames)
          return
        }

        const ts = timestamps[index]
        // Guard: clamp to video duration
        const clamped = Math.min(ts, video.duration - 0.05)
        video.currentTime = Math.max(clamped, 0)
      }

      video.onseeked = () => {
        // Draw current frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        canvas.toBlob((blob) => {
          if (blob) {
            frames.push({
              timestamp: timestamps[index],
              blob,
              dataUrl: canvas.toDataURL('image/webp', 0.8),
            })
          }
          index++
          seekNext()
        }, 'image/webp', 0.8)
      }

      video.onerror = (e) => {
        URL.revokeObjectURL(url)
        reject(new Error('Failed to load video'))
      }

      seekNext()
    }

    video.onerror = (e) => {
      URL.revokeObjectURL(url)
      reject(new Error('Cannot decode video file'))
    }
  })
}

/**
 * Generate adaptive sample timestamps from video metadata.
 * More samples around potential transition points.
 */
export function getSampleTimestamps(
  duration: number,
  minSamples: number = 7,
  maxSamples: number = 30
): number[] {
  const count = Math.max(minSamples, Math.min(maxSamples, Math.ceil(duration * 2)))
  const timestamps: number[] = []
  for (let i = 0; i < count; i++) {
    timestamps.push(Math.round((i / (count - 1)) * duration * 100) / 100)
  }
  return timestamps
}
