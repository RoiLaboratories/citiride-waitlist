import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/server/rate-limit";
import {
  getNewsletterTable,
  getSupabaseClient,
} from "@/lib/server/supabase";
import { newsletterSubscriptionSchema } from "@/lib/server/validation";

export const runtime = "nodejs";

async function readJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, "newsletter");

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { headers: rateLimit.headers, status: 429 },
    );
  }

  const parsed = newsletterSubscriptionSchema.safeParse(await readJson(request));

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please enter a valid email address.",
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
          "Newsletter storage is not configured yet. Add your Supabase environment variables.",
      },
      { headers: rateLimit.headers, status: 503 },
    );
  }

  const { data, error } = await supabase
    .from(getNewsletterTable())
    .insert({ email: parsed.data.email })
    .select("id, email, created_at")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "This email is already subscribed to CitiRide updates." },
        { headers: rateLimit.headers, status: 409 },
      );
    }

    console.error("Supabase newsletter insert failed", error);

    return NextResponse.json(
      { error: "We could not save your subscription. Please try again." },
      { headers: rateLimit.headers, status: 500 },
    );
  }

  return NextResponse.json(
    {
      entry: data,
      message: "You're subscribed to CitiRide updates.",
    },
    { headers: rateLimit.headers, status: 201 },
  );
}