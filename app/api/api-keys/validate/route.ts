import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
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
