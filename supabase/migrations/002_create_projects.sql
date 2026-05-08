-- Projects table: one per recording upload
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'uploading' CHECK (status IN ('uploading', 'processing', 'ready', 'error')),
  video_url TEXT,
  video_duration_seconds NUMERIC,
  states_count INT DEFAULT 0,
  transitions_count INT DEFAULT 7,  -- from PRD example
  effects_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- States: detected UI states from video
CREATE TABLE IF NOT EXISTS public.states (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  start_time_seconds NUMERIC NOT NULL,
  end_time_seconds NUMERIC NOT NULL,
  order_index INT NOT NULL,
  state_type TEXT DEFAULT 'default' CHECK (state_type IN ('idle', 'loading', 'empty', 'error', 'modal', 'form', 'list', 'detail', 'transition', 'default')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transitions: between states
CREATE TABLE IF NOT EXISTS public.transitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  from_state_id UUID REFERENCES public.states(id) ON DELETE SET NULL,
  to_state_id UUID REFERENCES public.states(id) ON DELETE SET NULL,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('click', 'type', 'submit', 'hover', 'scroll', 'timeout', 'api-response', 'route')),
  description TEXT,
  duration_ms INT DEFAULT 300,
  easing TEXT DEFAULT 'ease-out',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated code snippets
CREATE TABLE IF NOT EXISTS public.code_snippets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  language TEXT DEFAULT 'tsx',
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_snippets ENABLE ROW LEVEL SECURITY;

-- Allow all operations for anon (we'll add auth later)
CREATE POLICY "anon projects access" ON public.projects FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon states access" ON public.states FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon transitions access" ON public.transitions FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon code_snippets access" ON public.code_snippets FOR ALL TO anon USING (true) WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_states_project ON public.states (project_id, order_index);
CREATE INDEX IF NOT EXISTS idx_transitions_project ON public.transitions (project_id);
CREATE INDEX IF NOT EXISTS idx_code_snippets_project ON public.code_snippets (project_id);
