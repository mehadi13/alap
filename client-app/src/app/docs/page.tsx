import React from "react";
import { getDocContent } from "@/lib/docs";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { MarkdownViewer } from "@/components/docs/MarkdownViewer";

export default async function DocsIndexPage() {
  const doc = getDocContent(["README"]);

  if (!doc) {
    return (
      <DocsLayout activeSlug="README">
        <div className="text-center py-12 text-muted-foreground">
          Documentation root README not found.
        </div>
      </DocsLayout>
    );
  }

  return (
    <DocsLayout activeSlug="README" filePath={doc.filePath}>
      <MarkdownViewer content={doc.content} />
    </DocsLayout>
  );
}
