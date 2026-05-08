"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { Loader2, RefreshCw, Sparkles, Download } from "lucide-react";
import { StudioNav } from "@/components/studio/studio-nav";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/studio/code-preview";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/project/${id}`);
        const data = await res.json();
        if (data.project) setProject(data.project);
      } catch {
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-svh bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background">
      <StudioNav projectName={project?.name} />
      <div className="mx-auto max-w-7xl px-6 py-8">
        <TimelineEditor projectId={id} initialStatus={project?.status} />
      </div>
    </div>
  );
}

function TimelineEditor({
  projectId,
  initialStatus,
}: {
  projectId: string;
  initialStatus?: string;
}) {
  const [states, setStates] = useState<any[]>([]);
  const [transitions, setTransitions] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);
  const [codeFiles, setCodeFiles] = useState<any[]>([]);
  const [processing, setProcessing] = useState(
    initialStatus === "processing" || initialStatus === "uploading",
  );
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval>>();

  const loadTimeline = useCallback(async () => {
    try {
      const [statesRes, transitionsRes, projRes] = await Promise.all([
        fetch(`/api/project/${projectId}/states`),
        fetch(`/api/project/${projectId}/transitions`),
        fetch(`/api/project/${projectId}`),
      ]);
      const statesData = await statesRes.json();
      const transitionsData = await transitionsRes.json();
      const projData = await projRes.json();

      const s = statesData.states || [];
      const t = transitionsData.transitions || [];
      setStates(s);
      setTransitions(t);

      // Stop polling if we have states
      if (s.length > 0) {
        setProcessing(false);
        if (pollRef.current) {
          clearInterval(pollRef.current);
          pollRef.current = undefined;
        }
      }

      // Update processing status from project
      const status = projData.project?.status;
      if (status === "ready") {
        setProcessing(false);
        if (pollRef.current) {
          clearInterval(pollRef.current);
          pollRef.current = undefined;
        }
      } else if (status === "error") {
        setProcessing(false);
        setError("Processing failed. Try again below.");
        if (pollRef.current) {
          clearInterval(pollRef.current);
          pollRef.current = undefined;
        }
      }
    } catch (err) {
      console.error("Load timeline error:", err);
    }
  }, [projectId]);

  // Initial load + polling
  useEffect(() => {
    loadTimeline();

    pollRef.current = setInterval(loadTimeline, 2000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [loadTimeline]);

  const handleProcess = async () => {
    setProcessing(true);
    setError(null);
    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      // Start polling
      pollRef.current = setInterval(loadTimeline, 2000);
    } catch (err: any) {
      setProcessing(false);
      setError(err.message || "Processing failed");
    }
  };

  const handleGenerateCode = async () => {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          options: {
            framework: "react",
            styling: "tailwind",
            componentLib: "shadcn",
            stateManagement: "useState",
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCodeFiles(data.files || []);
    } catch (err: any) {
      setError(err.message || "Code generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadAll = async () => {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    // Add a package.json for the generated project
    zip.file(
      "package.json",
      JSON.stringify(
        {
          name: "pixelforge-generated",
          version: "1.0.0",
          private: true,
          scripts: {
            dev: "next dev",
            build: "next build",
            start: "next start",
          },
          dependencies: {
            next: "^15.0.0",
            react: "^19.0.0",
            "react-dom": "^19.0.0",
            "lucide-react": "^0.400.0",
            clsx: "^2.1.0",
            "tailwind-merge": "^2.5.0",
            "class-variance-authority": "^0.7.0",
          },
          devDependencies: {
            typescript: "^5.0.0",
            "@types/react": "^19.0.0",
            "@types/node": "^22.0.0",
            tailwindcss: "^3.4.0",
            "@tailwindcss/postcss": "^4.0.0",
            postcss: "^8.4.0",
          },
        },
        null,
        2,
      ),
    );

    // Add a tsconfig.json
    zip.file(
      "tsconfig.json",
      JSON.stringify(
        {
          compilerOptions: {
            target: "ES2017",
            lib: ["dom", "dom.iterable", "esnext"],
            allowJs: true,
            skipLibCheck: true,
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            module: "esnext",
            moduleResolution: "bundler",
            resolveJsonModule: true,
            isolatedModules: true,
            jsx: "react-jsx",
            incremental: true,
            plugins: [{ name: "next" }],
            paths: { "@/*": ["./*"] },
          },
          include: [
            "next-env.d.ts",
            "**/*.ts",
            "**/*.tsx",
            ".next/types/**/*.ts",
          ],
          exclude: ["node_modules"],
        },
        null,
        2,
      ),
    );

    // Add all generated files
    codeFiles.forEach((file) => {
      zip.file(file.filename, file.content);
    });

    // Generate zip and trigger download
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pixelforge-prototype.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Timeline Editor
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {states.length > 0
              ? `${states.length} states detected · ${transitions.length} transitions`
              : processing
                ? "Analyzing your recording..."
                : "Ready to analyze"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleProcess}
            disabled={processing}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" /> Re-process
              </>
            )}
          </Button>
          <Button
            onClick={handleGenerateCode}
            disabled={generating || states.length === 0}
            size="sm"
            className="gap-2"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Generate React App
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* State timeline */}
      <div className="space-y-3">
        {states.map((state: any, i: number) => (
          <div
            key={state.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card/40 p-4 hover:border-primary/30 transition-colors"
          >
            <span className="font-mono text-xs text-primary min-w-[24px]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{state.name}</p>
              <p className="text-xs text-muted-foreground">
                {state.description}
              </p>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground bg-muted/30 px-2 py-0.5 rounded">
              {state.state_type}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {Number(state.start_time_seconds).toFixed(1)}s –{" "}
              {Number(state.end_time_seconds).toFixed(1)}s
            </span>
            {i < transitions.length && (
              <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground border-l border-border pl-3">
                <span className="bg-muted/30 px-2 py-0.5 rounded">
                  {transitions[i].trigger_type}
                </span>
                <span>{transitions[i].duration_ms}ms</span>
              </div>
            )}
          </div>
        ))}
        {states.length === 0 && !processing && (
          <div className="text-center py-16">
            <p className="text-sm text-muted-foreground mb-4">
              No states yet. Click "Re-process" to analyze your recording.
            </p>
            <Button onClick={handleProcess} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Process Recording
            </Button>
          </div>
        )}
        {processing && (
          <div className="text-center py-16">
            <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Analyzing your recording with AI...
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              This takes about 15-30 seconds
            </p>
          </div>
        )}
      </div>

      {/* Generated Code — Split View */}
      {codeFiles.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Generated Code</h3>
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span>◀ Code</span>
              <span className="w-16 h-1 rounded-full bg-border" />
              <span>Preview ▶</span>
            </div>
            <Button
              onClick={handleDownloadAll}
              size="sm"
              variant="default"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download All (.zip)
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Code */}
            <div className="rounded-2xl border border-border overflow-hidden max-h-[500px] overflow-y-auto">
              {codeFiles.map((file: any) => (
                <details
                  key={file.filename}
                  className="border-b border-border last:border-0"
                >
                  <summary className="px-4 py-3 cursor-pointer font-mono text-sm hover:bg-muted/20 sticky top-0 bg-background/90 backdrop-blur">
                    📄 {file.filename}
                  </summary>
                  <pre className="px-4 py-3 bg-background/60 overflow-x-auto text-xs font-mono leading-relaxed whitespace-pre-wrap">
                    {file.content}
                  </pre>
                </details>
              ))}
            </div>
            {/* Right: Live Preview */}
            <div
              className="rounded-2xl border border-border overflow-hidden"
              style={{ minHeight: 400 }}
            >
              <CodePreview files={codeFiles} projectName={project?.name} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
