"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { JoinWaitlistMenu } from "@/components/JoinWaitlistMenu";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About Us" },
  { href: "#insight", label: "Insight" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" aria-label="CitiRide home">
          <img src="/assets/citiride-logo.svg" alt="CitiRide" />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <JoinWaitlistMenu className="header-waitlist" />
          <button
            aria-expanded={mobileOpen}
            aria-label="Open navigation menu"
            className="mobile-menu-button"
            onClick={() => setMobileOpen(true)}
            type="button"
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="mobile-menu-layer">
          <button
            aria-label="Close navigation menu"
            className="mobile-menu-backdrop"
            onClick={() => setMobileOpen(false)}
            type="button"
          />
          <aside
            aria-label="Mobile navigation"
            aria-modal="true"
            className="mobile-panel"
            role="dialog"
          >
            <div className="mobile-panel-header">
              <a
                className="brand"
                href="#home"
                aria-label="CitiRide home"
                onClick={() => setMobileOpen(false)}
              >
                <img src="/assets/citiride-logo.svg" alt="CitiRide" />
              </a>
              <button
                aria-label="Close navigation menu"
                className="mobile-menu-close"
                onClick={() => setMobileOpen(false)}
                type="button"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile navigation links">
              {navItems.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mobile-panel-actions">
              <JoinWaitlistMenu
                align="left"
                className="mobile-waitlist"
                label="Join The Waitlist"
              />
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
