import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, Caveat } from "next/font/google";
import Script from "next/script";
import ThemeProvider from "@/components/ThemeProvider";
import MotionProvider from "@/components/MotionProvider";
import ConsentProvider from "@/components/legal/ConsentProvider";
import { getConsentBootstrapScript } from "@/lib/consent";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Marilyn's Banana Bread",
  description:
    "Freshly made and baked in small batches by Mom. Homemade banana bread in Original, Chocolate Chips, Chocolate Chips + Cashews, Walnut, and Biscoff. Message us through our Facebook page to order.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSerif.variable} ${dmSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="consent-bootstrap" strategy="beforeInteractive">
          {getConsentBootstrapScript()}
        </Script>
        <div aria-hidden="true" className="bg-ambient" />
        <div aria-hidden="true" className="bg-noise" />
        <MotionProvider>
          <ThemeProvider>
            <ConsentProvider>{children}</ConsentProvider>
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}