import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS

import "./globals.css";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Outrage",
  description:
    "聚焦社会不公事件，为弱势团体发声，互联网不会忘记。本网长期储存并不定期追踪已证实且恶劣的社会不公事件。 希望文案编辑能力强，有社会责任感的人加入本网信息的持续完善中。",
  keywords: ["社会不公", "性骚扰", "人大教授王贵元性骚扰女博士"],
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
