"use client";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="mt-4 leading-3">
      <button
        type="button"
        className="hover:text-sky-700 font-medium"
        onClick={() => router.back()}
      >
        <FontAwesomeIcon className="mr-1" icon={faChevronLeft} />
        Go Back
      </button>
    </div>
  );
};

export default BackButton;
