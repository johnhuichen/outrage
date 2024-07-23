import Link from "next/link";
import Image from "next/image";
import cx from "classnames";

import BodyColumn from "@/components/layout/BodyColumn";
import Footer from "@/components/widgets/Footer";
import Navbar from "@/components/widgets/Navbar";
import { getAllBlogs } from "@/lib/blog";

import Banner from "./Banner";

const Home = async () => {
  const allBlogs = await getAllBlogs();
  return (
    <main className="min-h-screen">
      <Navbar />
      <Banner />
      <BodyColumn>
        {allBlogs.map(({ title, createdAt, summary, id, coverUrl }) => {
          return (
            <Link
              className={cx(
                "flex sm:flex-row flex-col justify-between",
                "p-4 rounded bg-white text-black",
                "border-t border-slate-300",
                "hover:shadow",
                "group",
              )}
              href={`/blog/${id}`}
              key={`blog-${id}`}
            >
              {coverUrl && (
                <div className="flex items-center justify-center bg-black sm:justify-normal sm:min-w-[200px] sm:mr-8 sm:mb-0 mb-4">
                  <Image
                    className="rounded"
                    src={coverUrl}
                    height={200}
                    width={200}
                    alt="Cover Image"
                    fill={false}
                  />
                </div>
              )}
              <div>
                <h1 className="font-bold text-lg group-hover:text-blue-500">
                  {title}
                </h1>
                <div className="mb-2 italic text-md group-hover:text-blue-500">
                  {new Date(createdAt as string).toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div
                  className="text-md"
                  dangerouslySetInnerHTML={{ __html: summary }}
                />
              </div>
            </Link>
          );
        })}
      </BodyColumn>
      <Footer />
    </main>
  );
};

export default Home;
