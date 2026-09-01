import { Download } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Plain anchor, not a Button — it sits as a sibling of the card's dialog
 * trigger so a download never opens the preview.
 */
export function DownloadButton({
  href,
  fileName,
  className,
}: {
  href: string;
  fileName: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      download={fileName}
      title={`Download ${fileName}`}
      className={cn(
        "absolute right-2 top-2 z-10 rounded-md bg-background/80 p-1.5 opacity-70 backdrop-blur transition hover:bg-background hover:opacity-100 focus-visible:opacity-100",
        className,
      )}
    >
      <Download className="size-4" />
      <span className="sr-only">Download {fileName}</span>
    </a>
  );
}
