function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderMarkdown(markdown: string): string {
  const blocks = markdown.trim().split(/\n\s*\n/);

  return blocks
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trim());

      if (lines[0].startsWith("## ")) {
        return `<h2>${escapeHtml(lines[0].slice(3))}</h2>`;
      }

      if (lines.every((line) => line.startsWith("- "))) {
        const items = lines.map((line) => `<li>${escapeHtml(line.slice(2))}</li>`).join("");
        return `<ul>${items}</ul>`;
      }

      if (lines[0].startsWith("> ")) {
        const text = lines.map((line) => line.replace(/^>\s?/, "")).join(" ");
        return `<blockquote>${escapeHtml(text)}</blockquote>`;
      }

      return `<p>${escapeHtml(lines.join(" "))}</p>`;
    })
    .join("\n");
}
