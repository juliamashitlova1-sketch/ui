import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { I18nProvider } from "@/lib/i18n/context";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixelForge — Record once. Ship a working prototype.",
  description:
    "PixelForge turns screen recordings into interactive, production-ready prototypes. The first design-to-code tool that understands flows, not just frames.",
  generator: "v0.app",
  openGraph: {
    title: "PixelForge — Record once. Ship a working prototype.",
    description:
      "Turn screen recordings into interactive prototypes. The first design-to-code tool that understands flows, not just frames.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${geist.className} ${geistMono.variable ?? ""} antialiased`}
      >
        <I18nProvider>{children}</I18nProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
