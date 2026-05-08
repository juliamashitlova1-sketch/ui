-- Create storage bucket for video recordings
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('recordings', 'recordings', true, 104857600, ARRAY['video/mp4', 'video/quicktime', 'video/webm'])
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to recordings
CREATE POLICY "Public recordings access"
ON storage.objects FOR SELECT
TO anon
USING (bucket_id = 'recordings');

-- Allow upload for anyone (will add auth later)
CREATE POLICY "Anyone can upload recordings"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'recordings');
