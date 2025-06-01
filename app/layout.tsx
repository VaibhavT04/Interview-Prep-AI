import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "./globals.css";
import {Toaster} from "sonner";

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview Prep",
  description: "An AI powered platform to prepare for interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${rethinkSans.className} antialiased pattern`}
      >
        {children}

        <Toaster/>
      </body>
    </html>
  );
}
