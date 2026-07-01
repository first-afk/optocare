import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OptoVision",
  description:
    "A dedicated career and information portal for the optometry community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body
        className="min-h-full max-h-200 max-w-500 mx-auto grid"
        suppressHydrationWarning={true}
      >
        <ClerkProvider appearance={{ variables: { colorPrimary: "#00328a" } }}>
          <NextTopLoader
            color="#00328a" // Change this hex code to match your brand color!
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            easing="ease"
            speed={200}
          />
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
