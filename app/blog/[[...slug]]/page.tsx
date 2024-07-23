import cx from "classnames";

import { getBlog } from "@/lib/blog";
import Navbar from "@/components/widgets/Navbar";
import BodyColumn from "@/components/layout/BodyColumn";
import Footer from "@/components/widgets/Footer";
import BackButton from "@/components/widgets/BackButton";

const BlogPage = async ({
  params: { slug },
}: {
  params: { slug: string[] };
}) => {
  const [id, fileName] = slug;
  const { title, content } = await getBlog(id, fileName);

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
            "[&_p]:mb-4",
            "[&_a]:text-sky-700",
            "[&_a:hover]:text-sky-300",
            "[&_a]:break-words",
            "[&_h1]:mb-4",
            "[&_h1]:border-b-[1px]",
            "[&_h1]:border-b-slate-500",
            "[&_h1]:text-xl",
            "[&_h2]:mb-4",
            "[&_h2]:text-lg",
            "[&_h2]:font-bold",
            "[&_h3]:mb-2",
            "[&_h3]:font-bold",
            "[&_blockquote]:px-4",
            "[&_blockquote]:border-l-8",
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
