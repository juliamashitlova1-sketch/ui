import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { calculateSampleTimestamps } from '@/lib/video/processor'
import { segmentFrames } from '@/lib/ai/segmentation'
import { labelTransitions, buildStateMachine } from '@/lib/ai/labeling'

export async function POST(req: NextRequest) {
  try {
    const { projectId } = await req.json()

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Get project
    const { data: project } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single()

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Update status
    await supabase.from('projects').update({ status: 'processing' }).eq('id', projectId)

    // For a real implementation, we would extract frames from the video
    // and upload them to storage. Here we simulate the pipeline.

    const duration = project.video_duration_seconds || 30
    const timestamps = calculateSampleTimestamps(duration, 7, 60)

    // Create fake frame URLs (in production these would be actual extracted frames)
    const frameUrls = timestamps.map(() =>
      'https://picsum.photos/800/600' // placeholder
    )

    // Run AI pipeline
    let states = await segmentFrames(frameUrls, timestamps)

    // Save states to DB
    for (let i = 0; i < states.length; i++) {
      await supabase.from('states').insert({
        id: states[i].id,
        project_id: projectId,
        name: states[i].name,
        description: states[i].description,
        start_time_seconds: states[i].startTime,
        end_time_seconds: states[i].endTime,
        order_index: i,
        state_type: states[i].type,
      })
    }

    // Label transitions
    const transitions = await labelTransitions(states)

    // Save transitions to DB
    for (const t of transitions) {
      await supabase.from('transitions').insert({
        id: t.id,
        project_id: projectId,
        from_state_id: t.fromStateId,
        to_state_id: t.toStateId,
        trigger_type: t.triggerType,
        description: t.description,
        duration_ms: t.durationMs,
        easing: t.easing,
      })
    }

    // Build state machine stats
    const machine = buildStateMachine(states, transitions)

    // Update project
    await supabase.from('projects').update({
      status: 'ready',
      states_count: states.length,
      transitions_count: transitions.length,
      effects_count: machine.effectsCount,
    }).eq('id', projectId)

    return NextResponse.json({
      success: true,
      statesCount: states.length,
      transitionsCount: transitions.length,
      effectsCount: machine.effectsCount,
    })
  } catch (err) {
    console.error('Processing error:', err)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
