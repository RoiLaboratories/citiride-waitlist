import type {
  NewsletterSubscriptionPayload,
  NewsletterSubscriptionResponse,
} from "@/types/newsletter";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function submitNewsletterSubscription(
  payload: NewsletterSubscriptionPayload,
): Promise<NewsletterSubscriptionResponse> {
  const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
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
      body?.error ?? "We could not subscribe this email. Please try again.",
    );
  }

  return {
    message: body?.message ?? "You're subscribed to CitiRide updates.",
  };
}