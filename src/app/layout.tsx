import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import LoadingScreen from "@/components/ui/LoadingScreen";
import EasterEggs from "@/components/ui/EasterEggs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivani Tiwari | Full Stack Developer",
  description: "Full Stack Developer portfolio of Shivani Tiwari, featuring production-ready web applications, responsive interfaces, and AI-enabled systems.",
  keywords: [
    "Shivani Tiwari",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Supabase",
    "AI Integration",
    "MERN Stack",
  ],
  authors: [{ name: "Shivani Tiwari" }],
  openGraph: {
    title: "Shivani Tiwari | Full Stack Developer",
    description: "Full Stack Developer portfolio of Shivani Tiwari, featuring production-ready web applications, responsive interfaces, and AI-enabled systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivani Tiwari | Full Stack Developer",
    description: "Full Stack Developer portfolio of Shivani Tiwari, featuring production-ready web applications, responsive interfaces, and AI-enabled systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} scroll-smooth`}
    >
      <body className="bg-background text-white antialiased min-h-screen selection:bg-accent/20 selection:text-accent">
        <LoadingScreen />
        <EasterEggs />
        <SmoothScroll>

          <CustomCursor />
          <Navbar />
          <div className="glow-bg" />
          <main className="relative z-10 flex flex-col min-h-screen">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}

