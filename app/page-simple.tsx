"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import Link from "next/link"
import { SocialLinks } from "./components/social-links"

export default function SimplePage() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 })

  return (
    <div className="min-h-screen bg-black text-neutral-100 relative overflow-hidden">
      <main className="relative z-10">
        <section
          id="about"
          ref={aboutRef}
          className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
        >
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center space-y-8 text-center"
            >
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                >
                  Full Stack Developer
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto max-w-[700px] text-neutral-400 md:text-xl"
                >
                  Building digital experiences with quantum technologies. Crafting elegant solutions to complex problems
                  in the cybernetic age.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <SocialLinks />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-800 bg-black/80 backdrop-blur-md">
        <div className="container flex flex-col gap-2 sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-neutral-500">© 2090 Manish Sharma. All neural rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors" href="#">
              Terms of Neural Service
            </Link>
            <Link className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors" href="#">
              Quantum Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
