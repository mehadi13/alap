import React from "react";
import Link from "next/link";
import {
  FileText,
  Code2,
  BookOpen,
  Target,
  ChevronRight,
  Folder,
  FileCode,
} from "lucide-react";
import { DOCS_NAVIGATION, DocCategory, DocItem } from "@/lib/docs-nav";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  FileText,
  Code2,
  BookOpen,
  Target,
};

interface DocsLayoutProps {
  children: React.ReactNode;
  activeSlug: string;
  filePath?: string;
}

export function DocsLayout({ children, activeSlug, filePath }: DocsLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-7rem)]">
      {/* Docs Side Navigation Panel */}
      <aside className="w-full lg:w-72 shrink-0 border border-border bg-card/60 backdrop-blur-md rounded-2xl p-4 space-y-6 h-fit sticky top-20">
        <div className="flex items-center gap-2.5 pb-3 border-b border-border">
          <div className="h-8 w-8 rounded-xl bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/20 dark:text-[#7C7EF2] flex items-center justify-center font-bold">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-foreground tracking-tight">ALAP Docs</h2>
            <p className="text-[11px] text-muted-foreground">Documentation Hub</p>
          </div>
        </div>

        <nav className="space-y-5">
          {DOCS_NAVIGATION.map((cat: DocCategory) => {
            const CatIcon = ICON_MAP[cat.icon] || Folder;

            return (
              <div key={cat.title} className="space-y-2">
                <div className="flex items-center gap-2 px-2 text-xs font-bold text-foreground/80 uppercase tracking-wider">
                  <CatIcon className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                  <span>{cat.title}</span>
                </div>
                <div className="space-y-0.5 pl-2 border-l-2 border-border/60 ml-3">
                  {cat.items.map((item: DocItem) => {
                    const itemHref = item.slug === "README" ? "/docs" : `/docs/${item.slug}`;
                    const isActive =
                      activeSlug === item.slug ||
                      (item.slug === "README" && activeSlug === "");

                    return (
                      <Link
                        key={item.slug}
                        href={itemHref}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors",
                          isActive
                            ? "bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/20 dark:text-[#7C7EF2] font-bold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        )}
                      >
                        <span className="truncate">{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 border border-border bg-card rounded-2xl p-6 lg:p-8 space-y-6 shadow-xs">
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground">Docs</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-foreground capitalize">
              {activeSlug.replace(/\//g, " / ") || "Overview"}
            </span>
          </div>

          {filePath && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-lg border border-border">
              <FileCode className="h-3 w-3 text-[#5B5CE2] dark:text-[#7C7EF2]" />
              <span>{filePath}</span>
            </div>
          )}
        </div>

        {/* Markdown Document Content */}
        <div>{children}</div>
      </main>
    </div>
  );
}
