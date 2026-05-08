import { reason } from './client'
import type { DetectedState, DetectedTransition, StateMachine } from './types'

export async function labelTransitions(
  states: DetectedState[]
): Promise<DetectedTransition[]> {
  const transitions: DetectedTransition[] = []

  for (let i = 0; i < states.length - 1; i++) {
    const from = states[i]
    const to = states[i + 1]

    const prompt = `Analyze these two consecutive UI states from a screen recording:

State A (${from.type}): "${from.name}" at ${from.startTime}s
State B (${to.type}): "${to.name}" at ${to.startTime}s

What user action or system event likely caused the transition from A to B?
Output a JSON object:
{
  "triggerType": "click" | "type" | "submit" | "hover" | "scroll" | "timeout" | "api-response" | "route",
  "description": "brief description of the interaction",
  "durationMs": estimated transition duration in milliseconds,
  "easing": "ease-out" | "ease-in" | "ease-in-out" | "linear"
}
Return ONLY the JSON object.`

    try {
      const result = await reason(prompt)
      const parsed = JSON.parse(extractJSONBlock(result))
      transitions.push({
        id: crypto.randomUUID(),
        fromStateId: from.id,
        toStateId: to.id,
        triggerType: parsed.triggerType || 'click',
        description: parsed.description || `From ${from.name} to ${to.name}`,
        durationMs: parsed.durationMs || 300,
        easing: parsed.easing || 'ease-out',
      })
    } catch {
      transitions.push({
        id: crypto.randomUUID(),
        fromStateId: from.id,
        toStateId: to.id,
        triggerType: 'click',
        description: `Navigate from ${from.name} to ${to.name}`,
        durationMs: 300,
        easing: 'ease-out',
      })
    }
  }

  return transitions
}

function extractJSONBlock(text: string): string {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}') + 1
  if (start >= 0 && end > start) return text.slice(start, end)
  return '{}'
}

export function buildStateMachine(
  states: DetectedState[],
  transitions: DetectedTransition[]
): StateMachine {
  // Count async effects
  const effectsCount = states.filter(s =>
    s.type === 'loading' || s.type === 'error'
  ).length

  return { states, transitions, effectsCount }
}
