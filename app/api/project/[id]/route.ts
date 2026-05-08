import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServerClient()

    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const { data: states } = await supabase
      .from('states')
      .select('*')
      .eq('project_id', id)
      .order('order_index')

    const { data: transitions } = await supabase
      .from('transitions')
      .select('*')
      .eq('project_id', id)

    const { data: snippets } = await supabase
      .from('code_snippets')
      .select('*')
      .eq('project_id', id)
      .order('created_at', { ascending: false })

    return NextResponse.json({
      project,
      states: states || [],
      transitions: transitions || [],
      codeSnippets: snippets || [],
    })
  } catch (err) {
    console.error('Project detail error:', err)
    return NextResponse.json({ error: 'Failed to load project' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const supabase = createServerClient()

    const { error } = await supabase
      .from('projects')
      .update({ name: body.name, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
