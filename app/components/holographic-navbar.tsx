"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function HolographicNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl supports-[backdrop-filter]:bg-background/5 transition-all duration-300 ${
        scrolled ? "border-b border-blue-500/20 bg-black/40" : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="containerr flex h-16 items-center justify-between px-4 md:px-6">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <motion.span
              className="hidden font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
              whileHover={{ scale: 1.05 }}
            >
              John.dev
            </motion.span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#about" className="text-blue-300 hover:text-blue-100 transition-colors relative group">
              <span>About</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#projects" className="text-blue-300 hover:text-blue-100 transition-colors relative group">
              <span>Projects</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#contact" className="text-blue-300 hover:text-blue-100 transition-colors relative group">
              <span>Contact</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button
            variant="outline"
            className="border-cyan-500/50 bg-black/30 backdrop-blur-md hover:bg-cyan-900/30 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
          >
            Neural Resume
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
