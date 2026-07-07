"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { StatusModal } from "@/components/StatusModal";
import { submitWaitlistEntry } from "@/lib/waitlist";
import type { WaitlistCategory } from "@/types/waitlist";

type WaitlistFormProps = {
  category: WaitlistCategory;
};

const emptyForm = {
  email: "",
  fullName: "",
  stateCity: "",
};

export function WaitlistForm({ category }: WaitlistFormProps) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<
    | { message: string; type: "error" | "success" }
    | { message: string; type: "idle" | "loading" }
  >({ message: "", type: "idle" });

  const isLoading = status.type === "loading";
  const isFormComplete = Object.values(form).every(
    (value) => value.trim().length > 0,
  );
  const isSubmitDisabled = isLoading || !isFormComplete;
  const isModalOpen = status.type !== "idle";
  const modalStatus = status.type === "idle" ? "loading" : status.type;
  const modalTitleId = `${category.toLowerCase()}-waitlist-status-title`;
  const modalDescriptionId = `${category.toLowerCase()}-waitlist-status-description`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    setStatus({
      message: "Please wait while we save your details.",
      type: "loading",
    });

    try {
      const response = await submitWaitlistEntry({
        category,
        email: form.email,
        fullName: form.fullName,
        stateCity: form.stateCity,
      });

      setForm(emptyForm);
      setStatus({
        message:
          response.message ??
          `You're on the ${category.toLowerCase()} waitlist. We'll keep you posted.`,
        type: "success",
      });
    } catch (error) {
      setStatus({
        message:
          error instanceof Error
            ? error.message
            : "We could not submit your details. Please try again.",
        type: "error",
      });
    }
  }

  function closeModal() {
    if (status.type === "loading") {
      return;
    }

    setStatus({ message: "", type: "idle" });
  }

  return (
    <>
      <form className="waitlist-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            autoComplete="name"
            name="fullName"
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                fullName: event.target.value,
              }))
            }
            placeholder="Full Name"
            required
            type="text"
            value={form.fullName}
          />
          <input
            autoComplete="address-level2"
            name="stateCity"
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                stateCity: event.target.value,
              }))
            }
            placeholder="State / City"
            required
            type="text"
            value={form.stateCity}
          />
        </div>
        <input
          autoComplete="email"
          name="email"
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              email: event.target.value,
            }))
          }
          placeholder="Email Address"
          required
          type="email"
          value={form.email}
        />
        <button
          data-loading={isLoading ? "true" : undefined}
          disabled={isSubmitDisabled}
          type="submit"
        >
          <span>Join the Waitlist</span>
          {isLoading ? (
            <Loader2 aria-hidden="true" className="spinner" size={18} />
          ) : (
            <ArrowRight aria-hidden="true" size={18} />
          )}
        </button>
      </form>

      {isModalOpen ? (
        <StatusModal
          descriptionId={modalDescriptionId}
          message={status.message}
          onClose={closeModal}
          status={modalStatus}
          title={
            status.type === "loading"
              ? "Joining the waitlist..."
              : status.type === "success"
                ? "Joined waitlist successfully"
                : "Submission failed"
          }
          titleId={modalTitleId}
        />
      ) : null}
    </>
  );
}