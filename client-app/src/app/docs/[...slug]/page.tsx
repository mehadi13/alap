import React from "react";
import { notFound } from "next/navigation";
import { getDocContent } from "@/lib/docs";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { MarkdownViewer } from "@/components/docs/MarkdownViewer";

interface DocsSlugPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function DocsSlugPage({ params }: DocsSlugPageProps) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug || [];
  const activeSlug = slugPath.join("/");

  const doc = getDocContent(slugPath);

  if (!doc) {
    notFound();
  }

  return (
    <DocsLayout activeSlug={activeSlug} filePath={doc.filePath}>
      <MarkdownViewer content={doc.content} />
    </DocsLayout>
  );
}
