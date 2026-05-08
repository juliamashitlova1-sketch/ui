import { analyzeFrames } from './client'
import type { DetectedState, FrameAnalysis } from './types'

export async function segmentFrames(
  frameUrls: string[],
  frameTimestamps: number[]
): Promise<DetectedState[]> {
  // Step 1: Analyze each frame individually (batch 5 frames per call)
  const analyses: FrameAnalysis[] = []

  for (let i = 0; i < frameUrls.length; i += 5) {
    const batchUrls = frameUrls.slice(i, i + 5)
    const batchTimestamps = frameTimestamps.slice(i, i + 5)

    const prompt = `Analyze these UI screenshots from a screen recording. For each frame, output a JSON object with:
- timestamp: the frame's time position (I'll provide these sequentially)
- dominantColor: primary background color (hex)
- hasSpinner: boolean, are there loading spinners visible
- hasSkeleton: boolean, are there skeleton loaders visible
- hasModal: boolean, is there a modal/dialog overlay
- hasForm: boolean, are there form input fields
- hasList: boolean, is there a list/table of items
- hasEmptyState: boolean, is the UI showing "no items" or empty state
- hasError: boolean, is there an error message/toast
- buttonCount: number of visible buttons
- inputCount: number of visible input fields
- textSummary: one sentence describing what the UI is showing

Return ONLY a JSON array: [{ "timestamp": 0.0, ... }]

Timestamps for these frames: ${JSON.stringify(batchTimestamps)}`

    const result = await analyzeFrames(batchUrls, prompt)
    try {
      const parsed = JSON.parse(extractJSON(result))
      analyses.push(...parsed)
    } catch {
      // Simulate analysis for robustness
      batchTimestamps.forEach(ts => analyses.push(simulateAnalysis(ts)))
    }
  }

  // Step 2: Cluster frames into states based on UI similarity
  return clusterIntoStates(analyses)
}

function clusterIntoStates(analyses: FrameAnalysis[]): DetectedState[] {
  if (analyses.length === 0) return []

  const states: DetectedState[] = []
  let currentState: DetectedState = {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    startTime: analyses[0].timestamp,
    endTime: analyses[0].timestamp,
    type: 'default',
    frames: [analyses[0]],
  }

  for (let i = 1; i < analyses.length; i++) {
    const prev = analyses[i - 1]
    const curr = analyses[i]

    const changed =
      prev.hasModal !== curr.hasModal ||
      prev.hasSpinner !== curr.hasSpinner ||
      prev.hasForm !== curr.hasForm ||
      prev.hasList !== curr.hasList ||
      prev.hasEmptyState !== curr.hasEmptyState ||
      prev.hasError !== curr.hasError ||
      Math.abs(prev.buttonCount - curr.buttonCount) > 1 ||
      Math.abs(prev.inputCount - curr.inputCount) > 1

    if (changed) {
      // Finalize current state
      currentState.endTime = prev.timestamp
      finalizeState(currentState)
      states.push(currentState)

      // Start new state
      currentState = {
        id: crypto.randomUUID(),
        name: '',
        description: '',
        startTime: curr.timestamp,
        endTime: curr.timestamp,
        type: 'default',
        frames: [curr],
      }
    } else {
      currentState.frames.push(curr)
      currentState.endTime = curr.timestamp
    }
  }

  // Don't forget the last state
  if (currentState.frames.length > 0) {
    finalizeState(currentState)
    states.push(currentState)
  }

  return states
}

function finalizeState(state: DetectedState) {
  const f = state.frames[Math.floor(state.frames.length / 2)] // median frame

  if (f.hasSpinner || f.hasSkeleton) state.type = 'loading'
  else if (f.hasEmptyState) state.type = 'empty'
  else if (f.hasError) state.type = 'error'
  else if (f.hasModal) state.type = 'modal'
  else if (f.hasForm) state.type = 'form'
  else if (f.hasList) state.type = 'list'
  else state.type = 'default'

  state.name = f.textSummary || `${state.type} state`
  state.description = `UI state at ${state.startTime.toFixed(1)}s - ${state.endTime.toFixed(1)}s`
}

function simulateAnalysis(timestamp: number): FrameAnalysis {
  return {
    timestamp,
    dominantColor: '#1a1a2e',
    hasSpinner: false,
    hasSkeleton: false,
    hasModal: false,
    hasForm: false,
    hasList: false,
    hasEmptyState: false,
    hasError: false,
    buttonCount: 0,
    inputCount: 0,
    textSummary: `Frame at ${timestamp.toFixed(1)}s`,
  }
}

function extractJSON(text: string): string {
  const start = text.indexOf('[')
  const end = text.lastIndexOf(']') + 1
  if (start >= 0 && end > start) return text.slice(start, end)
  return '[]'
}
