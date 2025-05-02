import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import type React from "react"

// Use Space Grotesk for a futuristic yet readable font
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "John.dev - Full Stack Developer",
  description: "Full stack developer portfolio showcasing projects and skills",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={cn("min-h-screen bg-background font-sans antialiased", spaceGrotesk.variable)}>{children}</body>
    </html>
  )
}
