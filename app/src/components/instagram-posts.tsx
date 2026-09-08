import { Images, Square } from "lucide-react";

import { CopyBlock } from "@/components/copy-block";
import { Inline, Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { isCarousel, type InstagramPost } from "@/lib/instagram-posts";
import { toPlainText } from "@/lib/markdown";
import { cn } from "@/lib/utils";

/**
 * Every written post, as it will look and as it will read. The hook is drawn at the ratio it
 * ships at, because slide one is the grid tile and is judged small; the caption and the first
 * comment sit beside it as copy blocks, because they are pasted, not read. The words come
 * from the note in the vault and are never edited here.
 */

/** The hook fence is one block of lines. A blank line is a gap, not a paragraph break. */
function HookTile({ post }: { post: InstagramPost }) {
  const lines = (post.hook ?? "").split("\n");
  const body = lines.slice(0, Math.max(1, lines.length - (lines.length > 2 ? 2 : 0)));
  const kicker = lines.length > 2 ? lines.slice(-1)[0] : "";
  const aspect = post.ratio === "9x16" ? "aspect-[9/16]" : post.ratio === "1x1" ? "aspect-square" : "aspect-[4/5]";

  return (
    <figure className="flex flex-col gap-2">
      <div
        className={cn(
          "relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-border px-6 text-center",
          aspect,
        )}
        style={{ backgroundColor: "#0E0E0E" }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 8% 104%, rgba(245,158,11,.20), rgba(236,72,153,.10) 46%, rgba(14,14,14,0) 72%)",
          }}
        />
        <p className="relative font-heading text-xl font-semibold leading-tight text-white sm:text-2xl">
          {body.map((line, index) => (
            <span key={index} className="block">
              {line || " "}
            </span>
          ))}
        </p>
        {kicker && (
          <p className="relative mt-5 font-mono text-[0.7rem] text-muted-foreground">{kicker}</p>
        )}
      </div>
      <figcaption className="text-center font-mono text-[0.7rem] text-muted-foreground">
        Slide 1 · the grid tile{post.ratio ? ` · ${post.ratio.replace("x", ":")}` : ""}
      </figcaption>
    </figure>
  );
}

function PostCard({ post }: { post: InstagramPost }) {
  const carousel = isCarousel(post);
  return (
    <article
      id={post.slug}
      className="flex scroll-mt-24 flex-col gap-6 rounded-xl border border-border bg-card/50 p-5"
    >
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant={carousel ? "default" : "secondary"}>
            {carousel ? <Images /> : <Square />}
            {carousel ? "Carousel" : "Single tile"}
          </Badge>
          {post.slides && (
            <Badge variant="outline" className="font-mono text-[0.7rem]">
              {post.slides} slides
            </Badge>
          )}
          {post.pillar && <Badge variant="secondary">{post.pillar}</Badge>}
          {post.date && (
            <Badge variant="outline" className="font-mono text-[0.7rem]">
              posts {post.date}
            </Badge>
          )}
          {post.status && (
            <Badge variant="outline" className="font-mono text-[0.7rem]">
              {post.status}
            </Badge>
          )}
        </div>
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          <Inline text={post.title} />
        </h3>
        <code className="font-mono text-[0.7rem] text-muted-foreground">{post.slug}</code>
      </header>

      <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <HookTile post={post} />
        <div className="flex min-w-0 flex-col gap-4">
          {post.lede.length > 0 && (
            <div className="text-sm">
              <Markdown blocks={post.lede} />
            </div>
          )}
          {post.hookNotes.length > 0 && (
            <div className="text-sm">
              <Markdown blocks={post.hookNotes} />
            </div>
          )}
        </div>
      </div>

      {post.slideTable && (
        <section className="flex flex-col gap-2">
          <h4 className="text-xs uppercase tracking-wide text-muted-foreground">
            {carousel ? "Every slide, verbatim" : "What is on the tile"}
          </h4>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-border bg-card">
                  {post.slideTable.headers.map((header, index) => (
                    <th key={index} className="px-3 py-2 font-medium text-foreground">
                      <Inline text={header} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {post.slideTable.rows.map((row, index) => (
                  <tr key={index} className="border-b border-border/50 align-top last:border-b-0">
                    {row.map((cell, column) => (
                      <td
                        key={column}
                        className={cn(
                          "px-3 py-2 leading-relaxed",
                          column === 0 && "whitespace-nowrap font-mono text-muted-foreground",
                          column === row.length - 1 && "text-muted-foreground",
                        )}
                      >
                        <Inline text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {post.slideBlocks.length > 0 && (
            <div className="text-sm">
              <Markdown blocks={post.slideBlocks} />
            </div>
          )}
        </section>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {post.description ? (
          <CopyBlock
            title="Description"
            description="The caption, pasted as-is."
            text={post.description}
            copyLabel="Copy caption"
            toastMessage="Caption copied"
            wrap
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            No <code className="font-mono">## The description</code> section in the note yet.
          </p>
        )}
        {post.comment ? (
          <CopyBlock
            title="First comment"
            description="Posted under it, then pinned."
            text={post.comment}
            copyLabel="Copy comment"
            toastMessage="Comment copied"
            wrap
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            No <code className="font-mono">## The first comment</code> section in the note yet.
          </p>
        )}
      </div>

      {post.steps.length > 0 && (
        <section className="flex flex-col gap-2">
          <h4 className="text-xs uppercase tracking-wide text-muted-foreground">
            Do this, in order
          </h4>
          <ol className="grid gap-2 md:grid-cols-2">
            {post.steps.map((step, index) => (
              <li key={index} className="flex gap-3 rounded-lg border border-border bg-card p-3">
                <span className="brand-gradient-text shrink-0 font-heading text-sm font-semibold leading-5">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-xs leading-relaxed">
                  <Inline text={step} />
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <footer className="border-t border-border/60 pt-3">
        <code className="break-all font-mono text-[0.7rem] text-muted-foreground">
          {post.repoPath}
        </code>
      </footer>
    </article>
  );
}

export function InstagramPosts({ posts, dir }: { posts: InstagramPost[]; dir: string }) {
  if (posts.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
        No post is written yet. A post is one note in <code className="font-mono">{dir}</code>{" "}
        with <code className="font-mono">## The hook</code>,{" "}
        <code className="font-mono">## The carousel</code>,{" "}
        <code className="font-mono">## The description</code> and{" "}
        <code className="font-mono">## The first comment</code>; it shows up here on refresh.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

/** One line per post for the summary table above the cards. */
export function postSummary(post: InstagramPost) {
  return {
    slug: post.slug,
    date: post.date ?? "—",
    kind: isCarousel(post) ? `Carousel · ${post.slides ?? "?"} slides` : "Single tile",
    hook: toPlainText((post.hook ?? "").split("\n").filter(Boolean).slice(0, 2).join(" ")),
    status: post.status ?? "—",
  };
}
