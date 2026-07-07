"use client";

import { AlertCircle, CheckCircle2, Loader2, X } from "lucide-react";

export type StatusModalType = "error" | "loading" | "success";

type StatusModalProps = {
  actionLabel?: string;
  descriptionId: string;
  message: string;
  onClose: () => void;
  status: StatusModalType;
  title: string;
  titleId: string;
};

export function StatusModal({
  actionLabel,
  descriptionId,
  message,
  onClose,
  status,
  title,
  titleId,
}: StatusModalProps) {
  const canClose = status !== "loading";

  return (
    <div className="waitlist-status-modal__backdrop">
      <section
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-live="polite"
        aria-modal="true"
        className={`waitlist-status-modal waitlist-status-modal--${status}`}
        role="dialog"
      >
        {canClose ? (
          <button
            aria-label="Close status modal"
            className="waitlist-status-modal__close"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={17} strokeWidth={2.4} />
          </button>
        ) : null}

        <div className="waitlist-status-modal__icon" aria-hidden="true">
          {status === "loading" ? (
            <Loader2 className="spinner" size={30} />
          ) : status === "success" ? (
            <CheckCircle2 size={34} />
          ) : (
            <AlertCircle size={34} />
          )}
        </div>

        <h3 id={titleId}>{title}</h3>
        <p id={descriptionId}>{message}</p>

        {canClose ? (
          <button
            className="waitlist-status-modal__action"
            onClick={onClose}
            type="button"
          >
            {actionLabel ?? (status === "success" ? "Done" : "Try Again")}
          </button>
        ) : null}
      </section>
    </div>
  );
}