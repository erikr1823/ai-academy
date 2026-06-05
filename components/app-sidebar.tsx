"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type SidebarNavKey =
  | "dashboard"
  | "courses"
  | "roadmap"
  | "certificates"
  | "profile";

export const sidebarNavLinks: {
  label: string;
  href: string;
  key: SidebarNavKey;
}[] = [
  { label: "Dashboard", href: "/dashboard", key: "dashboard" },
  { label: "Courses", href: "/courses", key: "courses" },
  { label: "Roadmap", href: "/roadmap", key: "roadmap" },
  { label: "Certificates", href: "/certificates", key: "certificates" },
  { label: "Profile", href: "/profile", key: "profile" },
];

function isLinkActive(href: string, pathname: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarNav({
  activeKey,
  onNavigate,
}: {
  activeKey?: SidebarNavKey;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
      {sidebarNavLinks.map((link) => {
        const active =
          activeKey === link.key || isLinkActive(link.href, pathname);

        return (
          <Link
            key={link.key}
            href={link.href}
            onClick={onNavigate}
            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBrand() {
  return (
    <div className="border-b border-zinc-800 px-6 py-5">
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight text-white transition-colors hover:text-emerald-400"
      >
        AI <span className="text-emerald-400">Academy</span>
      </Link>
    </div>
  );
}

export function AppSidebarDesktop({
  activeKey,
  className = "",
}: {
  activeKey?: SidebarNavKey;
  className?: string;
}) {
  return (
    <aside
      className={`flex w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 ${className}`}
    >
      <SidebarBrand />
      <SidebarNav activeKey={activeKey} />
      <div className="border-t border-zinc-800 p-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 transition-all duration-200 hover:border-emerald-500/30">
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
            Student Portal
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Track courses, complete lessons, and earn certificates.
          </p>
          <Link
            href="/demo"
            className="mt-3 inline-flex text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
          >
            Tour the demo →
          </Link>
        </div>
      </div>
    </aside>
  );
}

export function AppSidebarMobileToggle({
  activeKey,
}: {
  activeKey?: SidebarNavKey;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-lg border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400 lg:hidden"
        aria-label="Open navigation menu"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 max-w-[85vw] flex-col border-r border-zinc-800 bg-zinc-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-white"
              >
                AI <span className="text-emerald-400">Academy</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-zinc-700 px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>
            <SidebarNav
              activeKey={activeKey}
              onNavigate={() => setOpen(false)}
            />
          </aside>
        </div>
      )}
    </>
  );
}
