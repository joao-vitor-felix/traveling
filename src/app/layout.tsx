import { NextAuthProvider } from "@/providers/auth";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import { PropsWithChildren } from "react";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Traveling",
  description: "O seu sonho também é o nosso sonho!"
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <body className={`flex flex-col min-h-screen ${poppins.className}`}>
        <NextAuthProvider>
          <Navigation />
          <ToastContainer />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
