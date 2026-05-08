-- Create waitlist table for PixelForge early-access signups
CREATE TABLE IF NOT EXISTS public.waitlist (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT,
  source TEXT NOT NULL DEFAULT 'landing-page',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow insert for anonymous users (frontend)
CREATE POLICY "Anyone can insert into waitlist"
  ON public.waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can view (admin)
CREATE POLICY "Only authenticated users can view waitlist"
  ON public.waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist (email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist (created_at DESC);
