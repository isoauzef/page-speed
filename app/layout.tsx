import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "BrightSweep Cleaning Co.";
const description = "Eco-friendly residential and office cleaning with hotel-level attention to detail.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  url: "https://brightsweep.co",
    siteName: title,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
};

export const viewport: Viewport = {
  themeColor: "#0ea5e9"
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="app-body">
        {children}
      </body>
    </html>
  );
}
