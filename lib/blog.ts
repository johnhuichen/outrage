import path from "path";
import fs from "fs";
import matter from "gray-matter";
import markdownIt from "markdown-it";

import { BlogData } from "@/domain/blog";

const MD_DIR = "md";
const DEFAULT_MD = "main.md";

const getBlog = async (
  dirName: string,
  fileName: string = DEFAULT_MD,
): Promise<BlogData> => {
  const mdDirectory = path.join(process.cwd(), MD_DIR);
  const filePath = path.join(mdDirectory, `${dirName}/${fileName}`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const { title, createdAt, summary, coverUrl } = data;
  const md = markdownIt();
  const [processedContent, processedSummary] = [content, summary, title].map(
    (data) => md.render(data),
  );

  return {
    title,
    createdAt,
    summary: String(processedSummary),
    id: dirName,
    coverUrl,
    content: String(processedContent),
  };
};

const getAllBlogs = async (): Promise<BlogData[]> => {
  const mdDirectory = path.join(process.cwd(), MD_DIR);
  const result = await Promise.all(
    fs.readdirSync(mdDirectory).map((dirName) => getBlog(dirName)),
  );

  return result.sort(
    (a, b) =>
      Date.parse(b.createdAt as string) - Date.parse(a.createdAt as string),
  );
};

export { getBlog, getAllBlogs };
