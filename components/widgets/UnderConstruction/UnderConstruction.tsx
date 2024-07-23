import Image from "next/image";

const UnderConstruction = () => {
  return (
    <>
      <h1 className="mt-12 mb-4 text-xl font-bold text-center">
        Oops, this page is work in progres right now
      </h1>
      <div className="flex justify-center">
        <Image
          src="/img/under-construction-sign.png"
          width={300}
          height={300}
          alt="Under Construction Sign"
        />
      </div>
    </>
  );
};

export default UnderConstruction;
