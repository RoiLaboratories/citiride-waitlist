import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/server/rate-limit";
import {
  getSupabaseClient,
  getWaitlistTable,
} from "@/lib/server/supabase";
import { waitlistEntrySchema } from "@/lib/server/validation";

export const runtime = "nodejs";

async function readJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, "waitlist");

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { headers: rateLimit.headers, status: 429 },
    );
  }

  const parsed = waitlistEntrySchema.safeParse(await readJson(request));

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form fields and try again.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { headers: rateLimit.headers, status: 400 },
    );
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Waitlist storage is not configured yet. Add your Supabase environment variables.",
      },
      { headers: rateLimit.headers, status: 503 },
    );
  }

  const record = {
    category: parsed.data.category,
    email: parsed.data.email,
    full_name: parsed.data.fullName,
    state_city: parsed.data.stateCity,
  };

  const { data, error } = await supabase
    .from(getWaitlistTable())
    .insert(record)
    .select("id, category, created_at")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        {
          error: `This email is already on the ${parsed.data.category.toLowerCase()} waitlist.`,
        },
        { headers: rateLimit.headers, status: 409 },
      );
    }

    console.error("Supabase insert failed", error);

    return NextResponse.json(
      { error: "We could not save your waitlist registration. Please try again." },
      { headers: rateLimit.headers, status: 500 },
    );
  }

  return NextResponse.json(
    {
      entry: data,
      message: `You're on the ${parsed.data.category.toLowerCase()} waitlist. We'll keep you posted.`,
    },
    { headers: rateLimit.headers, status: 201 },
  );
}