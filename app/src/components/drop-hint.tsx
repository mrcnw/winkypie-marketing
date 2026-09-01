import { FolderOpen } from "lucide-react";

/** Every gallery starts empty. Say exactly where the files go. */
export function DropHint({ dir, children }: { dir: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
      <FolderOpen className="size-5" />
      <p>
        Nothing here yet. Drop files into{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-foreground">
          {dir}
        </code>{" "}
        and refresh.
      </p>
      {children}
    </div>
  );
}
