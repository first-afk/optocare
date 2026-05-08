import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

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
        className="min-h-full flex flex-col"
        suppressHydrationWarning={true}
      >
        <ClerkProvider appearance={{ variables: { colorPrimary: "#00328a" } }}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
