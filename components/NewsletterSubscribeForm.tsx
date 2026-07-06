"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { submitNewsletterSubscription } from "@/lib/newsletter";

export function NewsletterSubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    | { message: string; type: "error" | "success" }
    | { message: string; type: "idle" | "loading" }
  >({ message: "", type: "idle" });

  const isLoading = status.type === "loading";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ message: "Subscribing...", type: "loading" });

    try {
      const response = await submitNewsletterSubscription({ email });

      setEmail("");
      setStatus({
        message: response.message,
        type: "success",
      });
    } catch (error) {
      setStatus({
        message:
          error instanceof Error
            ? error.message
            : "We could not subscribe this email. Please try again.",
        type: "error",
      });
    }
  }

  return (
    <form className="loop-form" onSubmit={handleSubmit}>
      <div className="loop-form__control">
        <input
          aria-label="Email address"
          autoComplete="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter Email"
          required
          type="email"
          value={email}
        />
        <button
          aria-label="Subscribe to newsletter"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <Loader2 aria-hidden="true" className="spinner" size={22} />
          ) : (
            <ArrowUpRight aria-hidden="true" size={25} />
          )}
        </button>
      </div>
      <p
        aria-live="polite"
        className={`loop-form__message ${
          status.type === "success"
            ? "loop-form__message--success"
            : status.type === "error"
              ? "loop-form__message--error"
              : ""
        }`}
      >
        {status.message}
      </p>
    </form>
  );
}