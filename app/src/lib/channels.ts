/** One vocabulary of channels, used for them and for us. No fs — safe on the client. */

export type ChannelKind =
  | "site"
  | "appstore"
  | "play"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "adlibrary"
  | "trustpilot"
  | "support";

export type Channel = {
  kind: ChannelKind;
  /** handle or host, shown next to the slot name */
  label: string;
  /** null renders a dead slot — something that does not exist yet */
  url: string | null;
  /** false = nothing verified; the link, if any, is a search */
  found: boolean;
  /** why it is empty, or what the link is */
  hint?: string;
};

export const CHANNEL_LABEL: Record<ChannelKind, string> = {
  site: "Site",
  appstore: "App Store",
  play: "Play",
  adlibrary: "Ad Library",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  trustpilot: "Trustpilot",
  support: "Support",
};

// App-data aggregators and review farms rank well and end up in notes as
// sources. They are not the competitor's channel.
const NOT_THEIRS =
  /(mwm\.ai|appbrain|apkpure|apkgk|apkcombo|appadvice|justuseapp|appshunter|appfollow|similarweb|sensortower|data\.ai|screensdesign|swipestats|wikipedia|producthunt|g2\.com|reddit|quora|medium\.com|youtube)/;

/** Where a link points, judged by host — never by the text someone typed around it. */
export function classify(url: string, brand: string): Channel | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const host = parsed.hostname.replace(/^www\./, "");
  const handle = parsed.pathname.split("/").filter(Boolean)[0];

  if (host.endsWith("apps.apple.com")) return { kind: "appstore", label: "", url, found: true };
  if (host.endsWith("play.google.com")) return { kind: "play", label: "", url, found: true };
  if (host.endsWith("instagram.com") && handle)
    return { kind: "instagram", label: `@${handle}`, url, found: true };
  if (host.endsWith("tiktok.com") && handle?.startsWith("@"))
    return { kind: "tiktok", label: handle, url, found: true };
  if (host.endsWith("facebook.com"))
    return parsed.pathname.startsWith("/ads/library")
      ? { kind: "adlibrary", label: "", url, found: true }
      : { kind: "facebook", label: "", url, found: true };
  if (host.endsWith("trustpilot.com")) return { kind: "trustpilot", label: "", url, found: true };
  if (NOT_THEIRS.test(host)) return null;

  // Their own domain nearly always carries the brand name. Without that, a
  // link is somebody writing about them, not their site.
  const domain = host.replace(/\.[a-z.]+$/, "").replace(/[^a-z0-9]/g, "");
  if (!brand || !domain.includes(brand)) return null;

  return { kind: "site", label: host, url, found: true };
}

/** Nothing verified yet — point at the platform's own search so it can be found. */
export function searchUrl(kind: ChannelKind, name: string): string | null {
  const q = encodeURIComponent(name);
  switch (kind) {
    case "instagram":
      return `https://www.instagram.com/explore/search/keyword/?q=${q}`;
    case "tiktok":
      return `https://www.tiktok.com/search?q=${q}`;
    case "facebook":
      return `https://www.facebook.com/search/pages/?q=${q}`;
    case "appstore":
      return `https://apps.apple.com/us/search?term=${q}`;
    case "site":
      return `https://duckduckgo.com/?q=${q}`;
    default:
      return null;
  }
}

/** Their live ads, one click away, even when nothing links there yet. */
export function adLibrarySearch(name: string) {
  const query = new URLSearchParams({
    active_status: "active",
    ad_type: "all",
    country: "ALL",
    media_type: "all",
    q: name,
    search_type: "keyword_unordered",
  });
  return `https://www.facebook.com/ads/library/?${query}`;
}
