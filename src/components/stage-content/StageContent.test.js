import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));

function extractBlock(source, startIndex) {
  const openIndex = source.indexOf("{", startIndex);
  if (openIndex === -1) return "";

  let depth = 0;
  for (let i = openIndex; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    if (source[i] === "}") depth -= 1;
    if (depth === 0) return source.slice(openIndex + 1, i);
  }

  return "";
}

test("keeps the Home gallery stage visible on mobile", () => {
  const scss = readFileSync(join(here, "StageContent.scss"), "utf8");
  const mobileMediaStart = scss.search(/@media\s*\(\s*max-width\s*:\s*768px\s*\)/);
  expect(mobileMediaStart).toBeGreaterThanOrEqual(0);

  const mobileRules = extractBlock(scss, mobileMediaStart);

  expect(mobileRules).not.toMatch(
    /\.stage-section--gallery\s*\{[^}]*display\s*:\s*none\s*;[^}]*\}/
  );
});
