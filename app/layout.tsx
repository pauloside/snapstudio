import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnapStudio — Moments, beautifully kept",
  description: "Photography sessions, thoughtful packages and private client galleries. Book your next story with SnapStudio.",
  metadataBase: new URL("https://snapstudio.vercel.app"),
  openGraph: {
    title: "SnapStudio — Moments, beautifully kept",
    description: "Portraits, celebrations and stories worth keeping.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
