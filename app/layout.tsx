import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS

import "./globals.css";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Outrage",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
