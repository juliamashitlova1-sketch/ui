import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServerClient()

    const { data: transitions, error } = await supabase
      .from('transitions')
      .select('*')
      .eq('project_id', id)

    if (error) throw error
    return NextResponse.json({ transitions })
  } catch (err) {
    return NextResponse.json({ transitions: [] })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params
    const { transitionId, trigger_type, description, duration_ms, easing } = await req.json()
    const supabase = createServerClient()

    const { error } = await supabase
      .from('transitions')
      .update({ trigger_type, description, duration_ms, easing })
      .eq('id', transitionId)
      .eq('project_id', projectId)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
