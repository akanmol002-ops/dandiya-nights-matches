import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#12032B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Dandiya Nights Matches - Find Your Garba Partner 🪔",
  description:
    "Match with your perfect Dandiya & Garba dance partner this Navratri! Real-time rhythm sync, side-by-side outfit coordination, venue radar, and ₹50 instant chat unlock.",
  keywords: [
    "Dandiya",
    "Navratri",
    "Garba Partner",
    "Dandiya Nights",
    "Dodhiya",
    "Raas",
    "3-Taali",
    "Festive Matching",
    "Kora Kendra",
    "Dome Worli",
    "Outfit Coordinator",
  ],
  authors: [{ name: "Dandiya Nights Matches" }],
  creator: "MotionSite AI",
  publisher: "Dandiya Nights Matches",
  metadataBase: new URL("https://dandiyanights.vercel.app"),
  openGraph: {
    title: "Dandiya Nights Matches - Find Your Garba Partner 🪔",
    description:
      "Match with your perfect Dandiya & Garba dance partner this Navratri. Live rhythm sync, venue radar, and outfit coordination!",
    url: "https://dandiyanights.vercel.app",
    siteName: "Dandiya Nights Matches",
    images: [
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&h=630&q=85",
        width: 1200,
        height: 630,
        alt: "Dandiya Nights Matches - Festive Navratri Partner Finder",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dandiya Nights Matches - Find Your Garba Partner 🪔",
    description:
      "Find your Navratri dance partner with live rhythm sync, outfit coordinator, and instant ₹50 chat unlock.",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&h=630&q=85",
    ],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪔</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-velvet text-neutral-100 min-h-screen selection:bg-magenta-neon selection:text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
