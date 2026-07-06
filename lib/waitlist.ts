import type { WaitlistApiResponse, WaitlistEntryPayload } from "@/types/waitlist";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function submitWaitlistEntry(
  payload: WaitlistEntryPayload,
): Promise<WaitlistApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const body = (await response.json().catch(() => null)) as
    | { error?: string; message?: string }
    | null;

  if (!response.ok) {
    throw new Error(
      body?.error ?? "We could not submit your details. Please try again.",
    );
  }

  return {
    message: body?.message ?? "Your waitlist registration has been received.",
  };
}
