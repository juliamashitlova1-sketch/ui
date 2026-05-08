'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { StudioNav } from '@/components/studio/studio-nav'

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [projRes, statesRes] = await Promise.all([
          fetch(`/api/project`),
          fetch(`/api/project/${id}`).catch(() => null),
        ])
        const projData = await projRes.json()
        setProject(projData.projects?.find((p: any) => p.id === id) || null)
      } catch {} finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-svh bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-background">
      <StudioNav projectName={project?.name} />
      <div className="mx-auto max-w-7xl px-6 py-8">
        <TimelineEditor projectId={id} />
      </div>
    </div>
  )
}

function TimelineEditor({ projectId }: { projectId: string }) {
  const [states, setStates] = useState<any[]>([])
  const [transitions, setTransitions] = useState<any[]>([])
  const [generating, setGenerating] = useState(false)
  const [codeFiles, setCodeFiles] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const [statesRes, transitionsRes] = await Promise.all([
        fetch(`/api/project/${projectId}/states`),
        fetch(`/api/project/${projectId}/transitions`),
      ])
      if (statesRes.ok) setStates(await statesRes.json().then(d => d.states || []))
      if (transitionsRes.ok) setTransitions(await transitionsRes.json().then(d => d.transitions || []))
    }
    load()
  }, [projectId])

  const handleGenerateCode = async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          options: { framework: 'react', styling: 'tailwind', componentLib: 'shadcn', stateManagement: 'useState' }
        })
      })
      const data = await res.json()
      setCodeFiles(data.files || [])
    } catch {} finally {
      setGenerating(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Timeline Editor</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {states.length} states detected · {transitions.length} transitions
          </p>
        </div>
        <button
          onClick={handleGenerateCode}
          disabled={generating || states.length === 0}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all"
        >
          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {generating ? 'Generating...' : 'Generate React App'}
        </button>
      </div>

      {/* State cards */}
      <div className="space-y-3">
        {states.map((state: any, i: number) => (
          <div key={state.id} className="flex items-center gap-4 rounded-xl border border-border bg-card/40 p-4">
            <span className="font-mono text-xs text-primary min-w-[24px]">{String(i + 1).padStart(2, '0')}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{state.name}</p>
              <p className="text-xs text-muted-foreground">{state.description}</p>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground bg-muted/30 px-2 py-0.5 rounded">
              {state.state_type}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {state.start_time_seconds.toFixed(1)}s - {state.end_time_seconds.toFixed(1)}s
            </span>
            {i < transitions.length && (
              <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground border-l border-border pl-3">
                <span className="bg-muted/30 px-2 py-0.5 rounded">{transitions[i].trigger_type}</span>
                <span>{transitions[i].duration_ms}ms</span>
              </div>
            )}
          </div>
        ))}
        {states.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-12">
            {generating ? 'Processing your recording...' : 'No states detected yet. The AI is analyzing your video.'}
          </p>
        )}
      </div>

      {/* Generated Code */}
      {codeFiles.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">Generated Code</h3>
          <div className="rounded-2xl border border-border overflow-hidden">
            {codeFiles.map((file: any) => (
              <details key={file.filename} className="border-b border-border last:border-0">
                <summary className="px-4 py-3 cursor-pointer font-mono text-sm hover:bg-muted/20">
                  📄 {file.filename}
                </summary>
                <pre className="px-4 py-3 bg-background/60 overflow-x-auto text-xs font-mono leading-relaxed whitespace-pre-wrap">
                  {file.content}
                </pre>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
