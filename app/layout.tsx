import "./globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { Toaster } from "sonner";

export const metadata = {
  title: "Precedent - Building blocks for your Next.js project",
  description:
    "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
  metadataBase: new URL("https://precedent.dev"),
  themeColor: "#FFF",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="forest">
      <body className={cx(sfPro.variable, inter.variable)}>
        <Toaster  position="top-center"/>
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="box-border flex flex-col items-center justify-start w-full min-h-screen py-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
