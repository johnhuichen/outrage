import fs from "fs";
import path from "path";

if (process.argv.length < 3) {
  console.warn(`id is not provided`);
  console.warn(`Usage: yarn createMD [id]`);
  process.exit(1);
}

const id = process.argv[2];
const __dirname = path.resolve();
const mdDir = path.resolve(__dirname, "./md");
const ids = fs.readdirSync(mdDir);

if (ids.includes(id)) {
  console.warn(`Cannot generate new id: ${id} exists in ${mdDir}`);
  process.exit(1);
}

const newDir = path.resolve(mdDir, id);
const newMain = path.resolve(newDir, "main.md");
const newMainContent = `---
title: ""
createdAt: ""
summary: ""
---

TODO
`;

fs.mkdirSync(newDir);
fs.writeFileSync(newMain, newMainContent);
