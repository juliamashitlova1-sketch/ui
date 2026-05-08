import { NextResponse } from "next/server";

// Lazy Supabase admin client — only created at runtime, not during build
let supabaseAdmin: any = null;

async function getAdmin() {
  if (supabaseAdmin) return supabaseAdmin;
  const { createClient } = await import("@supabase/supabase-js");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  supabaseAdmin = createClient(url, key);
  return supabaseAdmin;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, role } = body;

    // Basic validation
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    const admin = await getAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 },
      );
    }

    // Check if email already exists
    const { data: existing } = await admin
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { message: "You're already on the list!" },
        { status: 200 },
      );
    }

    // Insert new signup
    const { error } = await admin.from("waitlist").insert({
      email,
      role: role || null,
      source: "landing-page",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to join waitlist. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "You're on the list! We'll be in touch within a week." },
      { status: 201 },
    );
  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
