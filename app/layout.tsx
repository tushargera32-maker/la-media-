import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

/*
  Inter carries headings and UI - the reference uses a bold geometric
  sans throughout. Playfair is used for one thing only: the statistics,
  which read as editorial rather than dashboard chrome because of it.
*/
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lamediacommunications.com"),
  title: {
    default: "LA Media & Communications - Ideas. Conversations. Impact.",
    template: "%s | LA Media & Communications",
  },
  description:
    "We create platforms and experiences that bring the architecture, design and built environment community together.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
