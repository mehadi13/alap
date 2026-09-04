export interface DocItem {
  title: string;
  slug: string;
  path: string;
}

export interface DocCategory {
  title: string;
  icon: string;
  items: DocItem[];
}

export const DOCS_NAVIGATION: DocCategory[] = [
  {
    title: "Overview",
    icon: "FileText",
    items: [
      { title: "Main Documentation Index", slug: "README", path: "README.md" },
    ],
  },
  {
    title: "Developer Docs",
    icon: "Code2",
    items: [
      { title: "Overview & Quick Start", slug: "developer/README", path: "developer/README.md" },
      { title: "System Architecture", slug: "developer/architecture", path: "developer/architecture.md" },
      { title: "Backend REST API Reference", slug: "developer/backend-api", path: "developer/backend-api.md" },
      { title: "Frontend Architecture", slug: "developer/frontend-apps", path: "developer/frontend-apps.md" },
    ],
  },
  {
    title: "User Manual",
    icon: "BookOpen",
    items: [
      { title: "User Manual Overview", slug: "user-manual/README", path: "user-manual/README.md" },
      { title: "Admin Panel User Guide", slug: "user-manual/admin-guide", path: "user-manual/admin-guide.md" },
      { title: "Client & Public Site Manual", slug: "user-manual/client-guide", path: "user-manual/client-guide.md" },
    ],
  },
  {
    title: "Goals & Roadmap",
    icon: "Target",
    items: [
      { title: "Goals & Roadmap Overview", slug: "roadmap/README", path: "roadmap/README.md" },
      { title: "Business Purpose & Strategy", slug: "roadmap/business-purpose", path: "roadmap/business-purpose.md" },
      { title: "Launch Roadmap & Status", slug: "roadmap/launch-roadmap", path: "roadmap/launch-roadmap.md" },
    ],
  },
];
