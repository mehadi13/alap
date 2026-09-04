import React from "react";
import { marked } from "marked";

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  const rawHtml = marked.parse(content, { gfm: true, breaks: true });
  const htmlContent = typeof rawHtml === "string" ? rawHtml : "";

  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none 
        [&_h1]:text-2xl [&_h1]:font-extrabold [&_h1]:text-foreground [&_h1]:mb-4 [&_h1]:pb-2 [&_h1]:border-b [&_h1]:border-border [&_h1]:tracking-tight
        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:pb-1 [&_h2]:border-b [&_h2]:border-border/50
        [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2
        [&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ul_li]:text-sm [&_ul_li]:text-muted-foreground
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1.5 [&_ol_li]:text-sm [&_ol_li]:text-muted-foreground
        [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:bg-muted [&_code]:text-xs [&_code]:font-mono [&_code]:text-[#5B5CE2] dark:[&_code]:text-[#7C7EF2]
        [&_pre]:p-4 [&_pre]:rounded-2xl [&_pre]:bg-slate-950 [&_pre]:text-slate-100 [&_pre]:overflow-x-auto [&_pre]:my-4 [&_pre_code]:bg-transparent [&_pre_code]:text-slate-100 [&_pre_code]:p-0
        [&_blockquote]:border-l-4 [&_blockquote]:border-[#5B5CE2] dark:[&_blockquote]:border-[#7C7EF2] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote_p]:text-foreground/90
        [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:text-xs
        [&_th]:border [&_th]:border-border [&_th]:bg-muted/80 [&_th]:p-2.5 [&_th]:text-left [&_th]:font-bold [&_th]:text-foreground
        [&_td]:border [&_td]:border-border [&_td]:p-2.5 [&_td]:text-muted-foreground
        [&_tr:nth-child(even)]:bg-muted/30
        [&_a]:text-[#5B5CE2] dark:[&_a]:text-[#7C7EF2] [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:opacity-80
        [&_hr]:my-8 [&_hr]:border-border"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
