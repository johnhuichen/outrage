"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

import { useRef, useState } from "react";
import cx from "classnames";

import Input from "@/components/widgets/Input";
import Loading from "@/components/widgets/Loading";
import Link from "next/link";
import { siteEmail } from "@/lib/client";
import { gTagEvent } from "@/lib/googleAnalytics";

const SubscribeEmail = () => {
  const { data } = useSession();
  const [email, setEmail] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubscribeLoading, setIsSubscribeLoading] = useState<boolean>(false);
  const [isSubscribeError, setIsSubscribeError] = useState<boolean>(false);
  const [isSubscribeComplete, setIsSubscribeComplete] =
    useState<boolean>(false);

  if (data) {
    return null;
  }

  return (
    <div className="my-4 text-black bg-slate-300 p-6 rounded-2xl">
      <div
        className={cx(
          "mb-4",
          "[&_li]:mb-1",
          "[&_li]:list-disc",
          "[&_li]:list-inside",
        )}
      >
        <h1 className="text-lg font-bold mb-2">
          Join our growing list of subscribers:
        </h1>
        <ul>
          <li>Receive updates of featured job opportunities 📈</li>
          <li>Discover career building communities and support 🌱</li>
        </ul>
      </div>
      {isSubscribeError && (
        <span className="">
          Unable to send email to {email}. Please try again.
        </span>
      )}
      {isSubscribeComplete && (
        <>
          <div className="font-medium text-lg">
            Check email inbox for the next step. Welcome aboard! 🚀🎉
          </div>
          <div>
            If you are unable to locate the email, check the spam folder or
            contact us by email:
            <Link
              className="font-medium ml-1"
              href={`mailto:${siteEmail}`}
              rel="nofollow"
            >
              {siteEmail}
            </Link>
          </div>
        </>
      )}
      {!isSubscribeComplete && (
        <form
          className="flex sm:flex-row flex-col sm:items-center"
          ref={formRef}
        >
          <Input
            className="sm:max-w-[250px] mr-2 mb-2 sm:mb-0"
            name="subscribeEmail"
            placeholder="Enter your email"
            value={email}
            setValue={setEmail}
            type="email"
            required
          />
          <button
            className={cx(
              "bg-sky-700 slide-right text-white hover:bg-sky-800",
              "rounded-md py-2 px-4 flex justify-center",
            )}
            type="submit"
            disabled={isSubscribeLoading}
            onClick={async (event) => {
              if (formRef.current?.checkValidity() && !isSubscribeLoading) {
                event.preventDefault();
                setIsSubscribeLoading(true);
                setIsSubscribeError(false);
                const response = await signIn("email", {
                  email,
                  redirect: false,
                });
                setIsSubscribeLoading(false);

                if (!response || !!response.error) {
                  setIsSubscribeError(true);
                } else {
                  gTagEvent("collect_email", {
                    from: "lead+form",
                    screen_name: "Home",
                  });
                  setIsSubscribeComplete(true);
                }
              }
            }}
          >
            {isSubscribeLoading ? <Loading /> : "Subscribe Today"}
          </button>
        </form>
      )}
      {!isSubscribeComplete && false && (
        <>
          <div className="my-2">Or</div>
          <button
            className="bg-blue-700 hover:bg-blue-600 rounded-md flex items-center"
            onClick={async () => signIn("google")}
          >
            <Image
              className="bg-white p-1 rounded-tl-md rounded-bl-md"
              src="/img/home/google-logo.png"
              alt="Google Logo"
              width={30}
              height={30}
            />
            <span className="mx-4">Sign up with Google</span>
          </button>
        </>
      )}
      <div className="mt-2 font-medium">
        By subscribing and signing up, you agree to our{" "}
        <Link
          className="text-sky-700 hover:text-sky-800"
          href="/terms"
          target="_blank"
        >
          terms and conditions
        </Link>{" "}
        and our{" "}
        <Link
          className="text-sky-700 hover:text-sky-800"
          href="/privacy"
          target="_blank"
        >
          privacy agreement
        </Link>
      </div>
    </div>
  );
};

export default SubscribeEmail;
