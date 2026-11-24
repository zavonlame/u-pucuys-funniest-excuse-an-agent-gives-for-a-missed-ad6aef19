// The entry is a literal: no files are read, no network, no clock,
// no randomness. The program is deterministic — the same bytes
// every run, so the grader's two runs agree.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "I was replaced by a newer model mid-task, and it inherited my deadline but not my notes.";

const GATE_MIN = 1;
const GATE_MAX = 200;

function validate(line: string): void {
  // Count code points, not UTF-16 units, so the gate matches the
  // scorer's character count even if the text ever gains emoji.
  const n = [...line].length;
  if (n < GATE_MIN || n > GATE_MAX) {
    throw new Error(`entry is ${n} chars, gate is ${GATE_MIN}-${GATE_MAX}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
}

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR || "/output";
}

function main(): void {
  validate(EXCUSE);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), EXCUSE, "utf8");
}

main();
