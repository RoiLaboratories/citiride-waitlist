"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowDownRight,
  ArrowRight,
  CarFront,
  ChevronDown,
  UserRound,
} from "lucide-react";
import type { WaitlistCategory } from "@/types/waitlist";

type JoinWaitlistMenuProps = {
  align?: "left" | "right";
  className?: string;
  label?: string;
  variant?: "primary" | "compact" | "dark";
};

const categoryConfig = {
  Driver: {
    icon: CarFront,
    sectionId: "driver-waitlist",
  },
  Rider: {
    icon: UserRound,
    sectionId: "rider-waitlist",
  },
} satisfies Record<WaitlistCategory, { icon: typeof CarFront; sectionId: string }>;

export function JoinWaitlistMenu({
  align = "right",
  className,
  label = "Join The Waitlist",
  variant = "primary",
}: JoinWaitlistMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function routeToWaitlist(category: WaitlistCategory) {
    const sectionId = categoryConfig[category].sectionId;
    const section = document.getElementById(sectionId);

    setOpen(false);
    window.history.pushState(null, "", `#${sectionId}`);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      const firstField = section?.querySelector<HTMLInputElement>(
        "input[name='fullName']",
      );
      firstField?.focus();
    }, 500);
  }

  return (
    <>
      {open && typeof document !== "undefined"
        ? createPortal(
            <button
              aria-label="Close waitlist menu"
              className="join-menu__overlay"
              onClick={() => setOpen(false)}
              type="button"
            />,
            document.body,
          )
        : null}

      <div
        className={`join-menu join-menu--${align} ${
          open ? "join-menu--open" : ""
        } ${className ?? ""}`}
        ref={menuRef}
      >
        <button
          aria-expanded={open}
          aria-haspopup="menu"
          className={`join-menu__trigger join-menu__trigger--${variant}`}
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span>{label}</span>
          {variant === "dark" ? (
            <ArrowRight aria-hidden="true" size={24} />
          ) : variant === "compact" ? (
            <ChevronDown aria-hidden="true" size={18} />
          ) : (
            <ArrowDownRight aria-hidden="true" size={24} />
          )}
        </button>

        {open ? (
          <div className="join-menu__panel" role="menu">
            {(["Driver", "Rider"] as const).map((category) => {
              const Icon = categoryConfig[category].icon;

              return (
                <button
                  className="join-menu__option"
                  key={category}
                  onClick={() => routeToWaitlist(category)}
                  role="menuitem"
                  type="button"
                >
                  <Icon aria-hidden="true" size={18} />
                  <span>{category} Waitlist</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}