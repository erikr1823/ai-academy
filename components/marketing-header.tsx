import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/80 backdrop-blur-xl">
      <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white"
        >
          AI <span className="text-emerald-400">Academy</span>
        </Link>

        <div className="hidden items-center justify-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-emerald-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 sm:gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-400"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}

export const marketingFooterNavLinks = navLinks;
