"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import cx from "classnames";

import BodyColumn from "@/components/layout/BodyColumn";

type NavLink = { label: string; href: string };

// const navLinks: NavLink[] = [{ label: "Home", href: "/" }];
const navLinks: NavLink[] = [];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-white sticky top-0 z-40">
      <BodyColumn className="flex justify-between flex-col sm:flex-row lg:px-0 py-4">
        <Link
          href="/"
          className="text-xl tracking-widest uppercase flex items-center mb-2 sm:mb-0"
        >
          <Image width={141} height={50} src="/img/logo.png" alt="Logo" />
        </Link>
        <div className="flex items-center justify-between">
          <div>
            {navLinks.map(({ label, href }: NavLink) => (
              <Link
                key={`nav-link-${label}`}
                className={cx("font-medium mr-4 hover:text-gray-300", {
                  "text-gray-500": pathname !== href,
                })}
                href={href}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </BodyColumn>
    </div>
  );
};

export default Navbar;
