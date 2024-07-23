import { v4 as uuid4 } from "uuid";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const mdDir = path.resolve(__dirname, "./md");
const ids = fs.readdirSync(mdDir);

const id = uuid4();

if (ids.includes(id)) {
  console.warn(`Cannot generate new id: ${id} exists in ${mdDir}`);
  process.exit(1);
}

const newDir = path.resolve(mdDir, id);
const newMain = path.resolve(newDir, "main.md");

fs.mkdirSync(newDir);
fs.writeFileSync(newMain, "");
