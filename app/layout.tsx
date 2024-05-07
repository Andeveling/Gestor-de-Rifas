import "./globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { Toaster } from "sonner";

export const metadata = {
  title: "Gestor de Rifas",
  description:
    "Gestor de rifas para la compra de los usuarios. Crea rifas, agrega preguntas y respuestas, y comparte tus rifas con tus amigos.",
  metadataBase: new URL("http://localhost:3000"),
  themeColor: "#FFF",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="forest" suppressHydrationWarning>
      <body className={cx(sfPro.variable, inter.variable)}>
        <Toaster position="top-center" />
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex flex-col items-center justify-start w-full min-h-screen py-20 ">
          {children}
        </main>
        {/* <NavMobileTabs/> */}
        <Footer />
      </body>
    </html>
  );
}
