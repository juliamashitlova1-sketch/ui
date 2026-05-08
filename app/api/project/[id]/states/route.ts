import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServerClient()

    const { data: states, error } = await supabase
      .from('states')
      .select('*')
      .eq('project_id', id)
      .order('order_index')

    if (error) throw error
    return NextResponse.json({ states })
  } catch (err) {
    return NextResponse.json({ states: [] })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params
    const { stateId, name, description, state_type, order_index } = await req.json()
    const supabase = createServerClient()

    const { error } = await supabase
      .from('states')
      .update({ name, description, state_type, order_index })
      .eq('id', stateId)
      .eq('project_id', projectId)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params
    const body = await req.json()
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('states')
      .insert({
        project_id: projectId,
        name: body.name || 'New state',
        description: body.description || '',
        start_time_seconds: body.start_time_seconds || 0,
        end_time_seconds: body.end_time_seconds || 1,
        order_index: body.order_index || 0,
        state_type: body.state_type || 'default',
      })
      .select('*')
      .single()

    if (error) throw error
    return NextResponse.json({ state: data }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params
    const { stateId } = await req.json()
    const supabase = createServerClient()

    const { error } = await supabase
      .from('states')
      .delete()
      .eq('id', stateId)
      .eq('project_id', projectId)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
