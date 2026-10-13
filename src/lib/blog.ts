import fs from "fs";
import path from "path";

export type BlogPost = {
  slug: string;
  titre: string;
  description: string;
  date: string;
  liens: { label: string; href: string }[];
  brouillon: boolean;
  contenu: string;
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const [, fm, content] = match;
  const data: Record<string, unknown> = {};
  const lines = fm.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (!keyMatch) {
      i++;
      continue;
    }
    const [, key, rest] = keyMatch;
    if (rest.trim() === "" && lines[i + 1]?.trim().startsWith("-")) {
      const items: Record<string, string>[] = [];
      i++;
      while (i < lines.length && lines[i].trim().startsWith("-")) {
        const item: Record<string, string> = {};
        const firstLine = lines[i].replace(/^\s*-\s*/, "");
        const [k1, ...v1] = firstLine.split(":");
        item[k1.trim()] = v1.join(":").trim();
        i++;
        while (i < lines.length && /^\s{2,}\w+:/.test(lines[i])) {
          const sub = lines[i].trim();
          const [k2, ...v2] = sub.split(":");
          item[k2.trim()] = v2.join(":").trim();
          i++;
        }
        items.push(item);
      }
      data[key] = items;
    } else {
      data[key] = rest.trim();
      i++;
    }
  }
  return { data, content: content.trim() };
}

function readPost(file: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
  const { data, content } = parseFrontmatter(raw);
  return {
    slug: file.replace(/\.md$/, ""),
    titre: String(data.titre ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    liens: Array.isArray(data.liens) ? (data.liens as { label: string; href: string }[]) : [],
    brouillon: String(data.brouillon) === "true",
    contenu: content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map(readPost)
    .filter((p) => !p.brouillon)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  return readPost(`${slug}.md`);
}
