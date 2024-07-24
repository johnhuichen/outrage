import type { Metadata } from "next";
import cx from "classnames";

import { getBlog } from "@/lib/blog";
import Navbar from "@/components/widgets/Navbar";
import BodyColumn from "@/components/layout/BodyColumn";
import Footer from "@/components/widgets/Footer";
import BackButton from "@/components/widgets/BackButton";

type PageProps = {
  params: { slug: string[] };
};

export const generateMetadata = async ({
  params: { slug },
}: PageProps): Promise<Metadata> => {
  const [id, fileName] = slug;
  const { title, summary } = await getBlog(
    decodeURIComponent(id),
    decodeURIComponent(fileName),
  );

  return {
    title: `${title} | Outrage`,
    description: summary,
    keywords: [],
    // openGraph: {},
  };
};

const BlogPage = async ({ params: { slug } }: PageProps) => {
  const [id, fileName] = slug;
  const { title, content } = await getBlog(
    decodeURIComponent(id),
    decodeURIComponent(fileName),
  );

  return (
    <main className="min-h-screen">
      <Navbar />
      <BodyColumn className="mt-8">
        <div className="mt-4 leading-3">
          <BackButton />
        </div>
        <h1 className="text-2xl mb-4 mt-8">{title}</h1>
        <div
          className={cx(
            "mb-8",
            "[&_p]:my-4",
            "[&_a]:text-sky-700 [&_a]:break-words [&_a:hover]:text-sky-300",
            "[&_h1]:text-xl [&_h1]:my-4 [&_h1]:border-b-[1px] [&_h1]:border-b-slate-500",
            "[&_h2]:text-lg [&_h2]:my-4 [&_h2]:font-bold",
            "[&_h3]:font-bold [&_h3]:my-2",
            "[&_blockquote]:px-4 [&_blockquote]:border-l-8",
            "[&_table]:border-[1px] [&_table]:border-slate-300",
            "[&_th]:px-4 [&_th]:py-2 [&_th]:bg-slate-200",
            "[&_th]:border-b-[1px] [&_th]:border-b-slate-300",
            "[&_th]:border-r-[1px] [&_th]:border-r-slate-300 [&_th:last-child]:border-r-0",
            "[&_td]:px-4 [&_td]:py-2",
            "[&_td]:border-r-[1px] [&_td]:border-r-slate-300 [&_td:last-child]:border-r-0",
            "[&_tr]:border-b-[1px] [&_tr]:border-b-slate-300 [&_tr:last-child]:border-b-0",
            "[&_li]:list-disc [&_li]:mb-1",
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="mt-4 leading-3">
          <BackButton />
        </div>
      </BodyColumn>
      <Footer />
    </main>
  );
};

export default BlogPage;
