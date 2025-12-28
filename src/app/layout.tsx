import "@/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: {
    template: "%s • Rainame",
    default: "Rainame official store • Raianame",
  },
  description:
    "Rainame is a modern fashion brand offering stylish and high-quality apparel for every occasion. Discover trendsetting designs and timeless elegance that redefine your wardrobe.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL("https://rainame.vercel.app/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  openGraph: {
    title: {
      template: "%s • Rainame",
      default: "Rainame official store • Raianame",
    },
    description:
      "Rainame is a modern fashion brand offering stylish and high-quality apparel for every occasion. Discover trendsetting designs and timeless elegance that redefine your wardrobe.",
    url: "https://rainame.vercel.app/",
    siteName: "Rainame",
    images: [
      {
        url: "https://utfs.io/f/0vsSPX9AUvOHeSXoWVN7hsiRrPmF5cQkfzEWqV093Hj7NbJv",
        width: 800,
        height: 600,
      },
      {
        url: "https://utfs.io/f/0vsSPX9AUvOHeSXoWVN7hsiRrPmF5cQkfzEWqV093Hj7NbJv",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: {
      template: "%s • Rainame",
      default: "Rainame official store • Raianame",
    },
    description:
      "Rainame is a modern fashion brand offering stylish and high-quality apparel for every occasion. Discover trendsetting designs and timeless elegance that redefine your wardrobe.",
    site: "https://rainame.vercel.app/",
    images: [
      {
        url: "https://utfs.io/f/0vsSPX9AUvOHeSXoWVN7hsiRrPmF5cQkfzEWqV093Hj7NbJv",
        width: 800,
        height: 600,
      },
      {
        url: "https://utfs.io/f/0vsSPX9AUvOHeSXoWVN7hsiRrPmF5cQkfzEWqV093Hj7NbJv",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
  },
};

const interSans = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interSans.className} antialiased`}>
        <TRPCReactProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
