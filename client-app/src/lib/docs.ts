import fs from "fs";
import path from "path";

export * from "./docs-nav";

export function getDocContent(slugPath: string[]): { content: string; filePath: string } | null {
  const possibleDocsDirs = [
    path.join(process.cwd(), "..", "docs"),
    path.join(process.cwd(), "docs")
  ];

  const relativePath = slugPath.join("/");

  for (const docsDir of possibleDocsDirs) {
    if (!fs.existsSync(docsDir)) continue;

    let targetFile = path.join(docsDir, `${relativePath}.md`);
    
    if (!fs.existsSync(targetFile)) {
      targetFile = path.join(docsDir, relativePath, "README.md");
    }

    if (!fs.existsSync(targetFile)) {
      targetFile = path.join(docsDir, "README.md");
    }

    if (fs.existsSync(targetFile)) {
      const content = fs.readFileSync(targetFile, "utf-8");
      return { content, filePath: path.relative(process.cwd(), targetFile) };
    }
  }

  return null;
}
