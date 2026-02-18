import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://oskarkwasniewski.dev",
  ),
  title: {
    default: "Oskar Kwaśniewski - Software Engineer",
    template: "%s | Oskar Kwaśniewski",
  },
  description:
    "Hey! I am Oskar Kwaśniewski, a Software Engineer from Poland with passion to Open Source. I enjoy building things for the web and mobile.",
  authors: [{ name: "Oskar Kwaśniewski" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Oskar Kwaśniewski",
    images: ["/preview_image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@o_kwasniewski",
    site: "@o_kwasniewski",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className={`${geist.variable} ${geist.className}`}>
      <body>
        <div className="pixel-scanlines" aria-hidden="true" />
        <Header />
        <main className="w-full max-w-[860px] px-6 py-8 mx-auto min-h-[88vh] mt-10 pixel-shell pixel-main pixel-reveal">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
