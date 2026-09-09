import { AssetCard } from "@/components/asset-card";
import { CopyBlock } from "@/components/copy-block";
import { Badge } from "@/components/ui/badge";
import type { Actor, ActorRecipe } from "@/lib/actors";

function Recipe({ recipe }: { recipe: ActorRecipe }) {
  const meta = [recipe.model, recipe.params].filter(Boolean).join(" · ");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="text-sm font-semibold">{recipe.label}</h4>
        <p className="font-mono text-xs text-muted-foreground">{meta}</p>
        {recipe.credits !== null && (
          <Badge variant="secondary" className="font-mono text-[0.7rem]">
            {recipe.credits} cr
          </Badge>
        )}
      </div>

      {recipe.prompt ? (
        <CopyBlock
          title="Prompt, as sent"
          text={recipe.prompt}
          copyLabel="Copy prompt"
          toastMessage="Prompt copied"
          wrap
        />
      ) : (
        <p className="rounded-xl border border-dashed border-border bg-card/50 p-4 text-sm text-muted-foreground">
          No prompt recorded here.
        </p>
      )}

      {recipe.promptNote && (
        <p className="text-sm text-muted-foreground">{recipe.promptNote}</p>
      )}

      {recipe.jobId && (
        <p className="font-mono text-xs text-muted-foreground">job {recipe.jobId}</p>
      )}
    </div>
  );
}

export function ActorCast({ actors }: { actors: Actor[] }) {
  return (
    <div className="flex flex-col gap-12">
      {actors.map((actor) => (
        <section key={actor.slug} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="brand-gradient-text font-heading text-xl font-semibold tracking-tight">
                {actor.name}
              </h2>
              <p className="font-mono text-xs text-muted-foreground">
                {actor.folder}
                {actor.added ? ` · cast ${actor.added}` : ""}
              </p>
            </div>
            {actor.look && <p className="text-sm text-muted-foreground">{actor.look}</p>}
          </div>

          {actor.note && <p className="max-w-2xl text-sm text-muted-foreground">{actor.note}</p>}

          {actor.disclosure && (
            <p className="max-w-2xl rounded-xl border border-border bg-card/50 p-4 text-sm">
              <span className="font-semibold">Disclosure — </span>
              <span className="text-muted-foreground">{actor.disclosure}</span>
            </p>
          )}

          {actor.assets.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {actor.assets.map((asset) => (
                <AssetCard key={asset.href} asset={asset} />
              ))}
            </div>
          )}

          {actor.recipes.length > 0 && (
            <div className="flex flex-col gap-6 border-t border-border/60 pt-5">
              <h3 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                How he was made · {actor.recipes.length}
              </h3>
              {actor.recipes.map((recipe) => (
                <Recipe key={recipe.label} recipe={recipe} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
