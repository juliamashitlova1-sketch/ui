import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const projectId = formData.get('projectId') as string | null
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
    }

    const supabase = createServerClient()
    const frameUrls: string[] = []

    // Process each uploaded frame
    const entries = Array.from(formData.entries()).filter(([key]) => key.startsWith('frame_'))
    for (const [key, value] of entries) {
      if (!(value instanceof File)) continue
      const file = value as File
      // Extract frame index from key "frame_0", "frame_1", etc.
      const index = parseInt(key.split('_')[1], 10)

      // Upload to storage
      const fileName = `frames/${projectId}/${index}.webp`
      const buffer = await file.arrayBuffer()
      const { error: uploadError } = await supabase.storage
        .from('recordings')
        .upload(fileName, buffer, { contentType: 'image/webp', upsert: true })

      if (uploadError) {
        console.warn(`Frame ${index} upload failed:`, uploadError.message)
        continue
      }

      const { data: urlData } = supabase.storage
        .from('recordings')
        .getPublicUrl(fileName)

      // Save to frames table
      await supabase.from('frames').insert({
        project_id: projectId,
        timestamp_seconds: parseFloat(formData.get(`ts_${index}`) as string) || index,
        order_index: index,
        storage_url: urlData.publicUrl,
      })

      frameUrls.push(urlData.publicUrl)
    }

    return NextResponse.json({
      success: true,
      frameCount: frameUrls.length,
      frameUrls,
    })
  } catch (err: any) {
    console.error('Frame upload error:', err)
    return NextResponse.json({ error: `Frame upload failed: ${err?.message || err}` }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get('projectId')
  if (!projectId) {
    return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
  }

  const supabase = createServerClient()
  const { data: frames } = await supabase
    .from('frames')
    .select('*')
    .eq('project_id', projectId)
    .order('order_index')

  return NextResponse.json({ frames: frames || [] })
}
