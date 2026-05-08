export type FrameAnalysis = {
  timestamp: number  // seconds
  dominantColor: string
  hasSpinner: boolean
  hasSkeleton: boolean
  hasModal: boolean
  hasForm: boolean
  hasList: boolean
  hasEmptyState: boolean
  hasError: boolean
  buttonCount: number
  inputCount: number
  textSummary: string  // one-line description
}

export type DetectedState = {
  id: string
  name: string
  description: string
  startTime: number
  endTime: number
  type: 'idle' | 'loading' | 'empty' | 'error' | 'modal' | 'form' | 'list' | 'detail' | 'transition' | 'default'
  frames: FrameAnalysis[]
}

export type DetectedTransition = {
  id: string
  fromStateId: string
  toStateId: string
  triggerType: 'click' | 'type' | 'submit' | 'hover' | 'scroll' | 'timeout' | 'api-response' | 'route'
  description: string
  durationMs: number
  easing: string
}

export type StateMachine = {
  states: DetectedState[]
  transitions: DetectedTransition[]
  effectsCount: number
}

export type GenerationOptions = {
  framework: 'react' | 'vue'
  styling: 'tailwind' | 'css-in-js'
  componentLib: 'shadcn' | 'none'
  stateManagement: 'useState' | 'useReducer'
}

export type GeneratedCode = {
  files: Array<{ filename: string; language: string; content: string }>
}
