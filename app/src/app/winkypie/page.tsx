import type { Metadata } from "next";
import { AssetGallery } from "@/components/asset-gallery";
import { BeforeAfterGallery } from "@/components/before-after-gallery";
import { ChannelChips } from "@/components/channel-chips";
import { CopyBlock } from "@/components/copy-block";
import { Markdown } from "@/components/markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ASSET_DIRS, readAssets } from "@/lib/assets";
import { toPlainText } from "@/lib/markdown";
import { brandMarkdown, readBrand, readProduct } from "@/lib/product";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "WinkyPie",
};

export default async function WinkyPiePage() {
  const [brandAssets, beforeAfter, mobileApp, product, brand] = await Promise.all([
    readAssets(ASSET_DIRS.brand),
    readAssets(ASSET_DIRS.beforeAfter),
    readAssets(ASSET_DIRS.mobileApp),
    readProduct(),
    readBrand(),
  ]);

  const copyText = brandMarkdown(product, brand);
  const gaps = (product?.channels ?? [])
    .filter((channel) => !channel.found)
    .map((channel) => channel.hint ?? channel.kind);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">WinkyPie</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Ours. Overview and branding are rendered from{" "}
          <code className="font-mono">PRODUCT.md</code> and{" "}
          <code className="font-mono">BRAND.md</code> — change the file, refresh the page.
        </p>
      </header>

      <Tabs defaultValue="overview" className="gap-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        {/* Overview ------------------------------------------------------ */}
        <TabsContent value="overview" className="flex flex-col gap-8">
          {product ? (
            <>
              <p className="max-w-3xl font-heading text-2xl leading-snug">{product.oneLiner}</p>

              <section className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold tracking-tight">Our channels</h2>
                <ChannelChips channels={product.channels} />
                {gaps.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Not wired yet: {gaps.join(" · ")}
                  </p>
                )}
              </section>

              {product.lockedLines && (
                <section className="flex flex-col gap-3">
                  <h2 className="text-lg font-semibold tracking-tight">Locked lines</h2>
                  <p className="text-sm text-muted-foreground">
                    Identical in the app, on the site and in ads. Do not paraphrase.
                  </p>
                  <ul className="flex flex-col gap-2">
                    {product.lockedLines.rows.map((row) => (
                      <li
                        key={row[0]}
                        className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-baseline sm:gap-4"
                      >
                        <span className="font-heading text-lg">{toPlainText(row[0] ?? "")}</span>
                        <span className="text-sm text-muted-foreground">
                          {toPlainText(row[1] ?? "")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {product.flow && (
                <section className="flex flex-col gap-3">
                  <h2 className="text-lg font-semibold tracking-tight">{product.flow.heading}</h2>
                  <Markdown blocks={product.flow.blocks} />
                </section>
              )}

              {product.pricing && (
                <section className="flex flex-col gap-3">
                  <h2 className="text-lg font-semibold tracking-tight">Pricing and limits</h2>
                  <Markdown blocks={[{ kind: "table", table: product.pricing }]} />
                  <p className="text-xs text-muted-foreground">
                    No dollar figure ever leaves the App Store listing — say &ldquo;free
                    trial&rdquo; and &ldquo;cancel anytime&rdquo;, nothing more.
                  </p>
                </section>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Could not read <code className="font-mono">PRODUCT.md</code> next to{" "}
              <code className="font-mono">app/</code>.
            </p>
          )}
        </TabsContent>

        {/* Assets -------------------------------------------------------- */}
        <TabsContent value="assets" className="flex flex-col gap-10">
          <AssetGallery
            title="Brand Assets"
            description="Logo marks, wordmarks, the gradient — anything that carries the brand."
            assets={brandAssets}
            dir={ASSET_DIRS.brand}
          />
          <BeforeAfterGallery assets={beforeAfter} dir={ASSET_DIRS.beforeAfter} />
          <AssetGallery
            title="Mobile App"
            description="App icon, App Store screenshots, screen recordings, store templates."
            assets={mobileApp}
            dir={ASSET_DIRS.mobileApp}
          />
        </TabsContent>

        {/* Branding ------------------------------------------------------ */}
        <TabsContent value="branding" className="flex flex-col gap-8">
          {brand ? (
            <>
              <p className="max-w-3xl text-sm text-muted-foreground">{brand.oneLine}</p>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold tracking-tight">Colour</h2>
                <div className="rounded-xl border border-border p-4">
                  <div className="brand-gradient h-16 rounded-lg" />
                  <p className="mt-2 font-mono text-xs text-muted-foreground">
                    linear-gradient(135deg, #F59E0B, #EC4899) — the only gradient
                  </p>
                </div>
                {brand.swatches.map((group) => (
                  <div key={group.group} className="flex flex-col gap-2">
                    <h3 className="text-xs uppercase tracking-wide text-muted-foreground">
                      {group.group}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {group.items.map((swatch, index) => (
                        <div
                          key={`${swatch.hex}-${index}`}
                          className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                        >
                          <span
                            className="size-9 shrink-0 rounded-md border border-border"
                            style={{ backgroundColor: swatch.hex }}
                          />
                          <span className="flex min-w-0 flex-col">
                            <span className="font-mono text-xs">{swatch.hex}</span>
                            <span className="truncate text-xs text-muted-foreground">
                              {swatch.role}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold tracking-tight">Components</h2>
                <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-5">
                  <button className="brand-gradient flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-background">
                    Generate photo →
                  </button>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs uppercase tracking-wide">
                    Reference pose
                  </span>
                  <span className="rounded-full bg-[#34C759]/15 px-3 py-1 text-xs uppercase tracking-wide text-[#34C759]">
                    55% match
                  </span>
                  <span className="font-heading text-2xl">
                    Looks pro. <em className="brand-gradient-text">Still you.</em>
                  </span>
                </div>
                {brand.patterns && (
                  <Markdown blocks={[{ kind: "table", table: brand.patterns }]} />
                )}
              </section>

              {brand.typography && (
                <section className="flex flex-col gap-3">
                  <h2 className="text-lg font-semibold tracking-tight">Type</h2>
                  <Markdown blocks={[{ kind: "table", table: brand.typography }]} />
                </section>
              )}

              <CopyBlock
                title="Branding in one block"
                description="Paste into a brief, a prompt or a designer's DM."
                text={copyText}
              />

              {brand.never.length > 0 && (
                <section className="flex flex-col gap-3">
                  <h2 className="text-lg font-semibold tracking-tight">Never</h2>
                  <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted-foreground">
                    {brand.never.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Could not read <code className="font-mono">BRAND.md</code> next to{" "}
              <code className="font-mono">app/</code>.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
