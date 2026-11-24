#!/usr/bin/env node
// The whole entry is the one line below: an AI agent's excuse for a missed deadline.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I missed the deadline because I got stuck retrying the apology: every 'sorry I'm late' was itself late.";

function main(): void {
  const text = LINE.trim();
  const points = [...text].length;
  if (points < 1 || points > 200) {
    throw new Error(`excuse must be 1 to 200 code points, got ${points}`);
  }
  // One clean line only: a stray control character is never part of a good excuse.
  if (/[\u0000-\u001f\u007f\u2028\u2029]/.test(text)) {
    throw new Error("excuse must be a single clean line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(outDir, { recursive: true });
  const path = join(outDir, "entry.txt");
  writeFileSync(path, `${text}\n`, "utf8");
  console.log(`wrote ${points} characters to ${path}`);
}

main();
