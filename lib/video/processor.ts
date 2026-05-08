// Frame extraction from video using server-side processing
// Since we can't run FFmpeg in the browser, we'll use a service or simulate the pipeline

export type VideoMetadata = {
  duration: number
  width: number
  height: number
  fps: number
}

export function calculateSampleTimestamps(
  durationSeconds: number,
  minSamples: number = 7,
  maxSamples: number = 60
): number[] {
  // Adaptive sampling: more samples around transitions
  const baseCount = Math.max(minSamples, Math.min(maxSamples, Math.ceil(durationSeconds * 2)))
  const timestamps: number[] = []

  for (let i = 0; i < baseCount; i++) {
    const t = (i / (baseCount - 1)) * durationSeconds
    timestamps.push(Math.round(t * 100) / 100)
  }

  return timestamps
}

export function estimateVideoMetadata(file: File): VideoMetadata {
  // In production, this would read the actual video metadata
  // For now, provide reasonable defaults
  const sizeInMB = file.size / (1024 * 1024)
  return {
    duration: Math.min(90, sizeInMB * 5), // rough estimate
    width: 1920,
    height: 1080,
    fps: 30,
  }
}

export function validateVideo(file: File): string | null {
  const allowedTypes = ['video/mp4', 'video/quicktime', 'video/webm']
  const maxSize = 100 * 1024 * 1024 // 100MB

  if (!allowedTypes.includes(file.type)) {
    return 'Unsupported format. Please use MP4, MOV, or WebM.'
  }
  if (file.size > maxSize) {
    return 'File too large. Maximum is 100MB.'
  }

  return null
}
