import "./globals.css";
import "@lms/ui/styles.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application Portal",
  description: "",
};

// Move them out later to the shared package lib
import { Inter, Manrope } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.variable} ${manrope.className}`}>
        {children}
      </body>
    </html>
  );
}
