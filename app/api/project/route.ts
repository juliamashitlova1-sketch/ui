import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error
    return NextResponse.json({ projects })
  } catch (err) {
    console.error('List error:', err)
    return NextResponse.json({ projects: [] })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { projectId } = await req.json()
    const supabase = createServerClient()
    const { error } = await supabase.from('projects').delete().eq('id', projectId)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
