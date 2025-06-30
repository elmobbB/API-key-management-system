import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET all API keys
export async function GET() {
  const { data, error } = await supabase.from("api_keys").select("*");
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST create new API key
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabase
    .from("api_keys")
    .insert([body])
    .select();
  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data[0]);
}

// PUT update API key
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, ...updateFields } = body;
  const { data, error } = await supabase
    .from("api_keys")
    .update(updateFields)
    .eq("id", id)
    .select();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

// DELETE API key
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const { error } = await supabase.from("api_keys").delete().eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// POST /validate - validate API key
export async function POST_validate(req: NextRequest) {
  const { apiKey } = await req.json();
  const { data, error } = await supabase
    .from("api_keys")
    .select("id")
    .eq("key", apiKey)
    .single();
  if (error || !data) {
    return NextResponse.json({ valid: false });
  }
  return NextResponse.json({ valid: true });
}
