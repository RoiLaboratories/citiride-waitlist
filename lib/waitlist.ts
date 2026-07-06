import type { WaitlistApiResponse, WaitlistEntryPayload } from "@/types/waitlist";

export async function submitWaitlistEntry(
  payload: WaitlistEntryPayload,
): Promise<WaitlistApiResponse> {
  const response = await fetch("/api/waitlist", {
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