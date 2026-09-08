import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, Caveat } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
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
    "Freshly made and baked in small batches by Mom. Homemade banana bread in Plain, Chocolate Chips, and Chocolate Chips + Cashews. Message us on Facebook to order.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSerif.variable} ${dmSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div aria-hidden="true" className="bg-ambient" />
        <div aria-hidden="true" className="bg-noise" />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}