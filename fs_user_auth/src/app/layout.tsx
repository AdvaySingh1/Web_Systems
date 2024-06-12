import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// components
import NavBar from "./lib/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Auth",
  description: "Embedl",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
