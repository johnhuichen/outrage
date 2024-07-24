import Link from "next/link";

import BodyColumn from "@/components/layout/BodyColumn";

const Banner = () => {
  return (
    <div className="mb-8 bg-slate-800 text-white">
      <BodyColumn className="py-8 z-10">
        <div className="text-2xl">
          聚焦社会不公事件，为弱势团体发声，互联网不会忘记。
        </div>
        <div className="py-4">
          本网<span className="italic">长期储存并不定期追踪</span>
          已证实且恶劣的社会不公事件。
        </div>
        <div className="">
          希望文案编辑能力强，有社会责任感的人加入本网信息的持续完善中。详情请看
          <Link
            href="blog/人大教授性骚扰事件远未结束和建立本网的初衷/main"
            target="_blank"
            className="text-sky-300 px-1 hover:text-sky-500"
          >
            人大教授性骚扰事件远未结束和建立本网的初衷
          </Link>
        </div>
      </BodyColumn>
    </div>
  );
};

export default Banner;
