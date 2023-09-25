import { NextAuthProvider } from "@/providers/auth";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Traveling",
  description: "Seu sonho também é nosso!"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <Navigation />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
