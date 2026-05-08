import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const name = formData.get('name') as string || 'Untitled Recording'
    const loomUrl = formData.get('loomUrl') as string | null

    if (!file && !loomUrl) {
      return NextResponse.json({ error: 'No file or Loom URL provided' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Calculate estimated duration
    let duration = 0
    if (file) {
      duration = Math.min(90, file.size / (1024 * 1024) * 5)
    }

    // Create project record
    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        name,
        status: 'processing',
        video_duration_seconds: duration,
        video_url: loomUrl || 'file://' + (file?.name || 'recording'),
      })
      .select('*')
      .single()

    if (error) throw error

    // If it's a real file, upload to Supabase Storage
    if (file) {
      const buffer = await file.arrayBuffer()
      const { error: uploadError } = await supabase.storage
        .from('recordings')
        .upload(`${project.id}/${file.name}`, buffer, {
          contentType: file.type,
          upsert: true,
        })

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from('recordings')
          .getPublicUrl(`${project.id}/${file.name}`)
        await supabase.from('projects').update({ video_url: urlData.publicUrl }).eq('id', project.id)
      }
    }

    return NextResponse.json({ project }, { status: 201 })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
