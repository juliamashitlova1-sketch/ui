-- Extracted video frames for AI analysis
CREATE TABLE IF NOT EXISTS public.frames (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  timestamp_seconds NUMERIC NOT NULL,
  order_index INT NOT NULL,
  storage_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.frames ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon frames access" ON public.frames;
CREATE POLICY "anon frames access" ON public.frames FOR ALL TO anon USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_frames_project ON public.frames (project_id, order_index);
