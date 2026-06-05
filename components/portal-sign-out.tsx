"use client";

import { SignOutButton } from "@clerk/nextjs";

export function PortalSignOut({ className }: { className: string }) {
  return (
    <SignOutButton redirectUrl="/">
      <button type="button" className={className}>
        Sign Out
      </button>
    </SignOutButton>
  );
}
