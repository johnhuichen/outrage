"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";

import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

import Loading from "@/components/widgets/Loading";
import Input from "@/components/widgets/Input";
import useClickOutside from "@/components/hooks/useClickOutside";
import { siteEmail } from "@/lib/client";

const SignInMenu = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSignInMenu, setShowSignInMenu] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [isSignInLoading, setIsSignInLoading] = useState<boolean>(false);
  const [isSignInError, setIsSignInError] = useState<boolean>(false);
  const [isSignInComplete, setIsSignInComplete] = useState<boolean>(false);

  const signInFormRef = useRef<HTMLFormElement>(null);
  const { nodeRef: signInMenuRef } = useClickOutside({
    handleClickOutside: () => setShowSignInMenu(false),
  });
  const { nodeRef: userMenuRef } = useClickOutside({
    handleClickOutside: () => setShowUserMenu(false),
  });

  const { data, status } = useSession();
  const email = data?.user?.email || "";

  return (
    <div>
      {status == "loading" && <Loading className="w-8 h-8" />}
      {status == "unauthenticated" && (
        <div ref={signInMenuRef} className="relative">
          <button
            className="px-4 py-1 rounded-md bg-slate-100"
            onClick={() => setShowSignInMenu(!showSignInMenu)}
          >
            Welcome
          </button>
          {showSignInMenu && (
            <div
              className={cx(
                "absolute top-full right-0 mt-1 px-4 py-2 z-40 rounded-md w-[300px] break-all",
                "bg-slate-100 shadow",
              )}
            >
              {isSignInError && (
                <span className="">
                  Unable to send email to {email}. Please try again.
                </span>
              )}
              {isSignInComplete && (
                <>
                  <div className="font-medium text-lg">
                    Check email inbox for the next step. Welcome aboard! 🚀🎉
                  </div>
                  <div className="text-sm">
                    If you are unable to locate the email, check the spam folder
                    or contact us by email:
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
              {!isSignInComplete && (
                <form ref={signInFormRef}>
                  <Input
                    className="my-2"
                    placeholder="Enter your email"
                    name="signInEmail"
                    value={signInEmail}
                    setValue={setSignInEmail}
                    type="email"
                    required
                  />
                  <button
                    className={cx(
                      "rounded-md w-full flex justify-center my-2",
                      "hover:text-sky-300",
                    )}
                    type="submit"
                    onClick={async (event) => {
                      if (
                        signInFormRef.current?.checkValidity() &&
                        !isSignInLoading
                      ) {
                        event.preventDefault();
                        setIsSignInLoading(true);
                        setIsSignInError(false);
                        const response = await signIn("email", {
                          email: signInEmail,
                          redirect: false,
                        });
                        setIsSignInLoading(false);

                        if (!response || !!response.error) {
                          setIsSignInError(true);
                        } else {
                          setIsSignInComplete(true);
                        }
                      }
                    }}
                  >
                    {isSignInLoading ? (
                      <Loading />
                    ) : (
                      <div className="">
                        <FontAwesomeIcon
                          icon={faRightToBracket}
                          className="mr-2"
                        />
                        Sign In
                      </div>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
      {!!email && (
        <div ref={userMenuRef} className="relative">
          <button
            className="flex items-center justify-center uppercase bg-slate-100 rounded-[50%] w-8 h-8"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            {email[0]}
          </button>
          {showUserMenu && (
            <div
              className={cx(
                "absolute top-full right-0 mt-4 px-4 py-2 z-40 rounded-md",
                "bg-slate-100",
              )}
            >
              <div className="px-4 py-2 bg-slate-100 shadow shadow-lg rounded-md">
                <div className="">{email}</div>
              </div>
              <button
                className="py-2 w-full hover:text-sky-300"
                onClick={() => signOut()}
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SignInMenu;
