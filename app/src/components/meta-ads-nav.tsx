"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

/**
 * The two-level nav on /meta-ads, as links rather than tab state.
 *
 * Every tab is a route, so a view can be linked to, bookmarked and reloaded — which matters
 * because these are the pages people paste at each other. The active one is read from the
 * pathname; nothing here holds state.
 */

export type NavTab = { href: string; label: string; count?: string };
export type NavSection = { href: string; label: string; tabs: NavTab[] };

export function MetaAdsNav({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname();
  const section =
    sections.find((entry) => pathname.startsWith(entry.href)) ?? sections[0];

  // A detail page — a brief at /meta-ads/campaigns/<campaign> — is not a tab of its own.
  // It belongs to the tab it was opened from, which is the section's first.
  const activeTab =
    section.tabs.find(
      (tab) => pathname === tab.href || pathname.startsWith(`${tab.href}/`),
    ) ?? section.tabs[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Level one — underlined headings, no counts. */}
      <nav
        aria-label="Section"
        className="flex w-full justify-start gap-8 border-b border-border"
      >
        {sections.map((entry) => {
          const active = entry === section;
          return (
            <Link
              key={entry.href}
              href={entry.tabs[0].href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative pb-3 font-heading text-xl font-semibold tracking-tight transition-colors",
                active
                  ? "text-foreground after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 after:bg-brand"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {entry.label}
            </Link>
          );
        })}
      </nav>

      {/* Level two — the tabs of the open section. */}
      <nav aria-label={section.label} className="flex flex-wrap gap-1">
        {section.tabs.map((tab) => {
          const active = tab === activeTab;
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
              {tab.count && (
                <span className="ms-1.5 font-mono text-xs text-muted-foreground">
                  {tab.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
