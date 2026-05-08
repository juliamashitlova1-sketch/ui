import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { generateCode } from "@/lib/ai/code-gen";
import type {
  DetectedState,
  DetectedTransition,
  GenerationOptions,
} from "@/lib/ai/types";

export async function POST(req: NextRequest) {
  try {
    const { projectId, options } = await req.json();

    const supabase = createServerClient();

    // Get all states
    const { data: dbStates } = await supabase
      .from("states")
      .select("*")
      .eq("project_id", projectId)
      .order("order_index");

    // Get all transitions
    const { data: dbTransitions } = await supabase
      .from("transitions")
      .select("*")
      .eq("project_id", projectId);

    if (!dbStates || dbStates.length === 0) {
      return NextResponse.json({ error: "No states found" }, { status: 400 });
    }

    // Convert DB rows to AI types
    const states: DetectedState[] = dbStates.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description || "",
      startTime: s.start_time_seconds,
      endTime: s.end_time_seconds,
      type: s.state_type as DetectedState["type"],
      frames: [],
    }));

    const transitions: DetectedTransition[] = (dbTransitions || []).map(
      (t) => ({
        id: t.id,
        fromStateId: t.from_state_id || "",
        toStateId: t.to_state_id || "",
        triggerType: t.trigger_type as DetectedTransition["triggerType"],
        description: t.description || "",
        durationMs: t.duration_ms,
        easing: t.easing,
      }),
    );

    // Get frame URLs for visual reference
    const { data: dbFrames } = await supabase
      .from("frames")
      .select("storage_url")
      .eq("project_id", projectId)
      .order("order_index");
    const frameUrls = (dbFrames || []).map((f) => f.storage_url);

    // Generate code
    const genOptions: GenerationOptions = options || {
      framework: "react",
      styling: "tailwind",
      componentLib: "shadcn",
      stateManagement: "useState",
    };

    const result = await generateCode(
      { states, transitions, effectsCount: 3 },
      genOptions,
      frameUrls.length > 0 ? frameUrls : undefined,
    );

    // Save to DB and return
    for (const file of result.files) {
      await supabase.from("code_snippets").insert({
        project_id: projectId,
        filename: file.filename,
        language: file.language,
        content: file.content,
      });
    }

    return NextResponse.json({ files: result.files });
  } catch (err) {
    console.error("Code gen error:", err);
    return NextResponse.json(
      { error: "Code generation failed" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get("projectId");
  if (!projectId) {
    return NextResponse.json({ error: "Project ID required" }, { status: 400 });
  }

  const supabase = createServerClient();
  const { data: snippets } = await supabase
    .from("code_snippets")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })
    .limit(50);

  return NextResponse.json({ files: snippets || [] });
}
