import type { Metadata } from "next"
import { IBM_Plex_Sans_Thai_Looped, Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"
import { ClerkProvider } from "@clerk/nextjs"

const inter = IBM_Plex_Sans_Thai_Looped({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Linkedin 2.0",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`mx-auto relative  ${inter.className}`}>
        <ClerkProvider>
          {/* Toaster */}
          {/*  Navbar */}
          <header>
            <Navbar />
          </header>
          <div>
            <main>{children}</main>
          </div>
          {/* Footer */}
          <footer>
            <Footer />
          </footer>
        </ClerkProvider>
      </body>
    </html>
  )
}
