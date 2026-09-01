import type { Metadata } from "next";

import { AssetGallery } from "@/components/asset-gallery";
import { BeforeAfterGallery } from "@/components/before-after-gallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ASSET_DIRS, readAssets } from "@/lib/assets";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "WinkyPie assets",
};

export default async function WinkyPiePage() {
  const [brand, beforeAfter, mobileApp] = await Promise.all([
    readAssets(ASSET_DIRS.brand),
    readAssets(ASSET_DIRS.beforeAfter),
    readAssets(ASSET_DIRS.mobileApp),
  ]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">WinkyPie</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          What the product looks like. Claims, brand values and the wording that has to ship
          next to an asset are in <code className="font-mono">PRODUCT.md</code> — this page
          only shows the files.
        </p>
      </header>

      <Tabs defaultValue="brand" className="gap-6">
        <TabsList>
          <TabsTrigger value="brand">Brand Assets</TabsTrigger>
          <TabsTrigger value="mobile">Mobile App</TabsTrigger>
        </TabsList>

        <TabsContent value="brand" className="flex flex-col gap-10">
          <BeforeAfterGallery assets={beforeAfter} dir={ASSET_DIRS.beforeAfter} />
          <AssetGallery
            title="Brand"
            description="Logo marks, wordmarks, the gradient, anything that carries the brand."
            assets={brand}
            dir={ASSET_DIRS.brand}
          />
        </TabsContent>

        <TabsContent value="mobile" className="flex flex-col gap-10">
          <AssetGallery
            title="Mobile App"
            description="App icon, App Store screenshots, screen recordings, store templates."
            assets={mobileApp}
            dir={ASSET_DIRS.mobileApp}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
