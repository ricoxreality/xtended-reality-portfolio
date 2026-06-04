import type { Metadata } from "next";
import { Cinzel, Raleway } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { ProjectProvider } from "@/context/ProjectContext";

// ── Cinzel: elegant serif, used for all display/headings (like Designstein)
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

// ── Raleway: refined sans-serif for body text and UI
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xtended Reality | AI Creative Studio",
  description: "Premium AI creative studio. Cinematic brand films, product ads, and experimental visual campaigns for brands that want to look impossible.",
  metadataBase: new URL("https://xtendedreality.studio"),
  openGraph: {
    title: "Xtended Reality | AI Creative Studio",
    description: "Cinematic AI-powered visuals for modern brands.",
    type: "website",
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
      className={`${cinzel.variable} ${raleway.variable} scroll-smooth`}
    >
      <body className="bg-[#111111] text-[#eeece6] antialiased min-h-screen flex flex-col">
        <SmoothScrolling>
          <ProjectProvider>
            <Preloader />
            <CustomCursor />
            {children}
          </ProjectProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
