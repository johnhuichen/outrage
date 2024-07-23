import BodyColumn from "@/components/layout/BodyColumn";

const Footer = () => {
  return (
    <BodyColumn className="my-8 flex sm:flex-row flex-col text-sm justify-between">
      <div className="text-gray-600 mr-2">
        @{new Date().getFullYear()} by Outrage
      </div>
    </BodyColumn>
  );
};

export default Footer;
