"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const TABS = [
  { href: "/winkypie", label: "WinkyPie" },
  { href: "/meta-ads", label: "Meta Ads" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold">
          <Image
            src="/logo.png"
            alt="WinkyPie"
            width={32}
            height={32}
            priority
            className="size-8"
          />
          <span className="brand-gradient-text font-heading text-lg italic leading-none">
            WinkyPie
          </span>
          <span className="leading-none text-muted-foreground">Dashboard</span>
        </Link>

        <nav className="flex items-center gap-1">
          {TABS.map((tab) => {
            const active = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
