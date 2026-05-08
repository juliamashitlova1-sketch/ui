import { createClient } from '@supabase/supabase-js'

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, key, {
    auth: { persistSession: false },
  })
}

export type Project = {
  id: string
  name: string
  status: 'uploading' | 'processing' | 'ready' | 'error'
  video_url: string | null
  video_duration_seconds: number | null
  states_count: number
  transitions_count: number
  effects_count: number
  created_at: string
  updated_at: string
}

export type UIState = {
  id: string
  project_id: string
  name: string
  description: string | null
  thumbnail_url: string | null
  start_time_seconds: number
  end_time_seconds: number
  order_index: number
  state_type: string
}

export type Transition = {
  id: string
  project_id: string
  from_state_id: string | null
  to_state_id: string | null
  trigger_type: string
  description: string | null
  duration_ms: number
  easing: string
}

export type CodeSnippet = {
  id: string
  project_id: string
  filename: string
  language: string
  content: string
}
