import Link from "next/link";

import BodyColumn from "@/components/layout/BodyColumn";

const Banner = () => {
  return (
    <div className="mb-8 bg-slate-800 text-white">
      <BodyColumn className="py-8 z-10">
        <div className="text-2xl">
          聚焦社会不公事件，为弱势团体发声，互联网不会忘记。
        </div>
        <div className="py-4 text-lg">
          Focus on events of social injustice. The internet will remember.
        </div>
        <div className="py-4">
          本网<span className="italic">长期储存并不定期追踪</span>
          已证实且极恶劣的 社会不公事件。
        </div>
        <div className="">
          我们需要更多的人帮助填补信息，详情点击
          <Link
            href="https://github.com/johnhuichen/outrage"
            target="_blank"
            className="text-sky-300 px-1 hover:text-sky-500"
          >
            Outrage Github
          </Link>
        </div>
        <div className="">
          We need your contribution to add more content to the website, for more
          information click
          <Link
            href="https://github.com/johnhuichen/outrage"
            target="_blank"
            className="text-sky-300 px-1 hover:text-sky-500"
          >
            Outrage Github
          </Link>
        </div>
      </BodyColumn>
    </div>
  );
};

export default Banner;
