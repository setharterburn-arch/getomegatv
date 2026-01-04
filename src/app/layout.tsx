import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter from Google Fonts
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omega TV | Stream Without Limits",
  description: "Experience premium streaming with Omega TV. Join today for unlimited entertainment.",
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
