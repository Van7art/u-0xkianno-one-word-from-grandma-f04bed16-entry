// One Word From Grandma — variant A.
// Writes exactly one word, and nothing else, to /output/entry.txt.
// Node 22+, erasable-only TypeScript, no dependencies, no network,
// fully deterministic: the same word on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const WORD = "Contraption";
const OUT = "/output/entry.txt";

// The entry must be exactly one word: 1-30 chars, no whitespace at all.
function assertWordValid(word: string): void {
  if (word.length < 1 || word.length > 30) {
    throw new Error(`word must be 1-30 chars, got ${word.length}`);
  }
  if (/\s/.test(word)) {
    throw new Error("word must contain no whitespace");
  }
}

// Gate: validate the word before writing, so a bad value can never
// reach /output/entry.txt — the file holds exactly one valid word.
assertWordValid(WORD);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, WORD, "utf8");
