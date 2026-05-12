import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";
import { AppToaster } from "@/components/AppToaster";

export const metadata: Metadata = {
  title: "DSA Interview Coach",
  description:
    "Practice Data Structures and Algorithms interviews with an AI interviewer trained on Striver SDE Sheet questions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col"
        style={{
          "--navbar-height": "4.75rem"
        } as CSSProperties}
      >
        <AuthProvider>
          <Navbar />
          {children}
          <AppToaster />
        </AuthProvider>
      </body>
    </html>
  );
}
