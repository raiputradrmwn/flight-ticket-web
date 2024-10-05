import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../globals.css";

export const metadata: Metadata = {
    title: "Dashboard | Sign in",
}
export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }
  