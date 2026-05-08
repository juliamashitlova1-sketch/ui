"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Video,
  ArrowRight,
  Loader2,
  Sparkles,
  LayoutList,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  extractFrames,
  getSampleTimestamps,
} from "@/lib/video/frame-extractor";
import type { ExtractedFrame } from "@/lib/video/frame-extractor";

type ProjectCardData = {
  id: string;
  name: string;
  status: string;
  states_count: number;
  transitions_count: number;
  created_at: string;
  video_duration_seconds: number;
};

export default function StudioPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectCardData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loomUrl, setLoomUrl] = useState("");
  const [inputMode, setInputMode] = useState<"file" | "url">("file");
  const [phase, setPhase] = useState<string>(""); // current step description

  useEffect(() => {
    fetch("/api/project")
      .then((r) => r.json())
      .then((d) => setProjects(d.projects || []))
      .catch(() => {});
  }, []);

  const handleUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      setError(null);

      try {
        // ── Step 1: Extract frames from video (client-side, Canvas API) ──
        setPhase("Extracting frames from video...");
        const video = document.createElement("video");
        video.preload = "metadata";
        const url = URL.createObjectURL(file);
        video.src = url;

        const duration = await new Promise<number>((resolve) => {
          video.onloadedmetadata = () => resolve(video.duration);
          video.onerror = () =>
            resolve(Math.min(90, (file.size / (1024 * 1024)) * 5));
        });
        URL.revokeObjectURL(url);

        const timestamps = getSampleTimestamps(duration, 10, 30);
        const frames = await extractFrames(file, timestamps);

        // ── Step 2: Upload video ──
        setPhase(`Uploading video and ${frames.length} frames...`);
        const uploadForm = new FormData();
        uploadForm.append("file", file);
        uploadForm.append("name", file.name.replace(/\.[^/.]+$/, ""));
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadForm,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error);
        const projectId = uploadData.project.id;

        // ── Step 3: Upload frames ──
        setPhase(`Uploading ${frames.length} analysis frames...`);
        const frameForm = new FormData();
        frameForm.append("projectId", projectId);
        frames.forEach((frame, i) => {
          frameForm.append(`frame_${i}`, frame.blob, `frame_${i}.webp`);
          frameForm.append(`ts_${i}`, String(frame.timestamp));
        });
        const frameRes = await fetch("/api/upload-frames", {
          method: "POST",
          body: frameForm,
        });
        if (!frameRes.ok) {
          console.warn("Frame upload had issues, continuing...");
        }

        // ── Step 4: Start AI processing ──
        setPhase("AI is analyzing your recording...");
        const processRes = await fetch("/api/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId }),
        });
        if (!processRes.ok) {
          const errData = await processRes.json().catch(() => ({}));
          console.warn("Process warning:", errData);
        }

        // ── Done ──
        router.push(`/studio/project/${projectId}`);
      } catch (err: any) {
        setError(err.message || "Upload failed");
        setPhase("");
      } finally {
        setUploading(false);
        setPhase("");
      }
    },
    [router],
  );

  const handleFileSelect = useCallback(
    (file: File | null) => {
      if (!file) return;
      if (!file.type.startsWith("video/")) {
        setError("Please select a video file (MP4, MOV, WebM)");
        return;
      }
      handleUpload(file);
    },
    [handleUpload],
  );

  const handleLoomSubmit = async () => {
    if (!loomUrl) return;
    setUploading(true);
    setError(null);
    setPhase("Importing Loom recording...");
    try {
      const formData = new FormData();
      formData.append("loomUrl", loomUrl);
      formData.append("name", "Loom Recording");
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: data.project.id }),
      });
      router.push(`/studio/project/${data.project.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      setPhase("");
    }
  };

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-primary" />
          PixelForge Studio
        </h1>
        <p className="mt-2 text-muted-foreground">
          Record once. Ship the prototype. Drop a recording below.
        </p>

        {/* Upload Area */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setInputMode("file")}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-mono transition-colors",
                inputMode === "file"
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              📁 Upload File
            </button>
            <button
              onClick={() => setInputMode("url")}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-mono transition-colors",
                inputMode === "url"
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              🔗 Loom URL
            </button>
          </div>

          {inputMode === "file" ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFileSelect(e.dataTransfer.files[0]);
              }}
              className={cn(
                "relative rounded-2xl border-2 border-dashed p-12 text-center transition-colors cursor-pointer",
                dragOver
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40",
                uploading && "pointer-events-none opacity-70",
              )}
              onClick={() => {
                if (uploading) return;
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "video/mp4,video/quicktime,video/webm";
                input.onchange = (e) =>
                  handleFileSelect(
                    (e.target as HTMLInputElement).files?.[0] || null,
                  );
                input.click();
              }}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  <div>
                    <p className="text-sm font-medium">
                      Processing your video...
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {phase}
                    </p>
                  </div>
                  {/* Mini progress bar */}
                  <div className="h-1 w-48 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full animate-pulse"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-4 text-sm font-medium">
                    Drop your screen recording here
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    MP4, MOV, WebM · Up to 90 seconds · 100MB max
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                placeholder="https://www.loom.com/share/..."
                value={loomUrl}
                onChange={(e) => setLoomUrl(e.target.value)}
                className="flex-1 h-12 rounded-xl border border-border bg-card/40 px-4 text-sm focus:outline-none focus:border-primary"
              />
              <Button
                onClick={handleLoomSubmit}
                disabled={uploading || !loomUrl}
                className="h-12 gap-2"
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Video className="h-4 w-4" />
                )}
                Import
              </Button>
            </div>
          )}

          {error && (
            <div className="mt-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>

        {/* Recent Frames Preview */}
        {uploading && phase.includes("frames") && (
          <div className="mt-6">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
              <Image className="h-3 w-3" /> Extracted frames preview
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-24 h-16 rounded-lg bg-muted/30 animate-pulse"
                />
              ))}
            </div>
          </div>
        )}

        {/* Project List */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
            <LayoutList className="h-5 w-5 text-muted-foreground" />
            Your Recordings
          </h2>
          {projects.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No recordings yet. Drop one above to get started.
            </p>
          ) : (
            <div className="mt-4 grid gap-3">
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onClick={() => router.push(`/studio/project/${p.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onClick,
}: {
  project: ProjectCardData;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group flex items-center justify-between rounded-xl border border-border bg-card/40 p-5 cursor-pointer hover:border-primary/40 hover:bg-card transition-colors"
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            project.status === "ready"
              ? "bg-primary/15 ring-1 ring-primary/30"
              : "bg-muted/40",
          )}
        >
          <Video
            className={cn(
              "h-5 w-5",
              project.status === "ready"
                ? "text-primary"
                : "text-muted-foreground",
            )}
          />
        </div>
        <div>
          <p className="text-sm font-semibold">{project.name}</p>
          <p className="text-xs text-muted-foreground">
            {project.states_count} states · {project.transitions_count}{" "}
            transitions · {Math.round(project.video_duration_seconds)}s
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <StatusBadge status={project.status} />
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const classes: Record<string, string> = {
    uploading: "bg-muted/50 text-muted-foreground",
    processing: "bg-accent/15 text-accent",
    ready: "bg-primary/15 text-primary",
    error: "bg-destructive/15 text-destructive",
  };
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider",
        classes[status] || "",
      )}
    >
      {status}
    </span>
  );
}
