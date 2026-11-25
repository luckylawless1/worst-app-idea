// The Worst App Idea Ever Pitched — make.fun entry (program/v1).
// Writes one sentence, at most 240 characters, pitching the worst,
// most useless app imaginable, to /output/entry.txt.
// SPDX-License-Identifier: MIT

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const PITCH =
  "SnoreSync: the app that pairs your snoring in real time with a stranger's " +
  "snoring on another continent, so two people who will never meet can snore " +
  "in perfect harmony, together, alone, forever.";

// The gate requires 1-240 characters of UTF-8 text, not only whitespace.
if (PITCH.length < 1 || PITCH.length > 240 || !PITCH.trim()) {
  throw new Error(`Pitch is ${PITCH.length} characters; gate needs 1-240.`);
}

// Create /output if missing; clear only its contents, never the root itself.
mkdirSync("/output", { recursive: true });
for (const name of readdirSync("/output")) {
  rmSync(`/output/${name}`, { recursive: true, force: true });
}

writeFileSync("/output/entry.txt", PITCH, "utf8");

// Read back and confirm the file holds exactly the pitch, byte for byte.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== PITCH) {
  throw new Error("Read-back mismatch: /output/entry.txt differs from the pitch.");
}
console.log(`Wrote ${PITCH.length}-character pitch to /output/entry.txt`);
