"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import { useInView } from "framer-motion"
import Link from "next/link"
import { SocialLinks } from "./components/social-links"
import FloatingNavbar from "./components/floating-navbar"
import GradientBackground from "./components/gradient-background"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Fingerprint, Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { submitContactForm } from "./actions"
import { ThemeProvider } from "@/components/theme-provider"

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 })
  const isProjectsInView = useInView(projectsRef, { once: true, amount: 0.3 })
  const isTechInView = useInView(techRef, { once: true, amount: 0.3 })
  const isContactInView = useInView(contactRef, { once: true, amount: 0.3 })

  // Update scrollY for background
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Projects data
  const projects = [
    {
      id: "quantum-ecommerce",
      title: "Quantum E-commerce",
      description:
        "A full-stack e-commerce platform with instant quantum data loading and holographic product displays.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Next.js", "React", "Node.js", "MongoDB", "Stripe"],
      links: {
        github: "https://github.com/manis-sharma/full-stack-app",
        live: "https://quantum-ecommerce.vercel.app",
      },
    },
    {
      id: "neural-task-manager",
      title: "Neural Task Manager",
      description:
        "A real-time task management system with AI-driven workflow optimization and biometric authentication.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "Firebase", "TensorFlow.js", "WebRTC"],
      links: {
        github: "https://github.com/manis-sharma/first-frontend-project",
        live: "https://neural-tasks.vercel.app",
      },
    },
    {
      id: "sentient-chat",
      title: "Sentient Chat Interface",
      description: "An AI-powered chat interface with emotional intelligence and holographic avatar projection.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["TypeScript", "OpenAI API", "Three.js", "WebGL"],
      links: {
        github: "https://github.com/manis-sharma/united-academy-dang",
        live: "https://sentient-chat.vercel.app",
      },
    },
  ]

  // Tech stack data
  const technologies = [
    // Frontend
    { name: "React", icon: "⚛️", color: "#61DAFB", category: "Frontend", level: 95 },
    { name: "Next.js", icon: "▲", color: "#ffffff", category: "Frontend", level: 90 },
    { name: "TypeScript", icon: "TS", color: "#3178C6", category: "Frontend", level: 85 },
    { name: "TailwindCSS", icon: "🌊", color: "#38B2AC", category: "Frontend", level: 90 },
    { name: "Framer Motion", icon: "🔄", color: "#FF4D8B", category: "Frontend", level: 80 },

    // Backend
    { name: "Node.js", icon: "🟢", color: "#339933", category: "Backend", level: 85 },
    { name: "Express", icon: "🚂", color: "#000000", category: "Backend", level: 80 },
    { name: "MongoDB", icon: "🍃", color: "#47A248", category: "Backend", level: 75 },
    { name: "PostgreSQL", icon: "🐘", color: "#336791", category: "Backend", level: 70 },
    { name: "GraphQL", icon: "◯", color: "#E535AB", category: "Backend", level: 65 },

    // DevOps
    { name: "Docker", icon: "🐳", color: "#2496ED", category: "DevOps", level: 70 },
    { name: "AWS", icon: "☁️", color: "#FF9900", category: "DevOps", level: 65 },
    { name: "CI/CD", icon: "🔄", color: "#4CAF50", category: "DevOps", level: 75 },
    { name: "Git", icon: "🔀", color: "#F05032", category: "DevOps", level: 90 },
    { name: "Linux", icon: "🐧", color: "#FCC624", category: "DevOps", level: 80 },
  ]

  const categories = [...new Set(technologies.map((tech) => tech.category))]

  // Contact form state
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [scanComplete, setScanComplete] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      const response = await submitContactForm(formData)
      setMessage(response.message)
      // Reset form
      setFormState({ name: "", email: "", message: "" })
      setScanComplete(false)
    } catch (error) {
      setMessage("Neural connection failed. Please try again.")
    } finally {
      setPending(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const simulateBiometricScan = () => {
    setPending(true)
    setTimeout(() => {
      setPending(false)
      setScanComplete(true)
    }, 2000)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div
        ref={containerRef}
        className="min-h-screen bg-black dark:bg-black text-neutral-800 dark:text-neutral-100 relative overflow-hidden"
      >
        <GradientBackground scrollY={scrollY} />
        <FloatingNavbar />

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
                    Building digital experiences with quantum technologies. Crafting elegant solutions to complex
                    problems in the cybernetic age.
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

          <section id="projects" ref={projectsRef} className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black pointer-events-none"></div>
            <div className="container px-4 md:px-6 relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-16 text-center"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Projects
                </span>
              </motion.h2>

              {/* Projects Grid */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card className="overflow-hidden h-full bg-neutral-900/30 backdrop-blur-md border-neutral-800 group hover:border-blue-500/30 transition-colors duration-300">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      </div>
                      <div className="p-5 relative">
                        <h3 className="font-semibold text-xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                          {project.title}
                        </h3>
                        <p className="text-sm text-neutral-400 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full bg-blue-950/30 px-2.5 py-0.5 text-xs font-medium text-blue-300 border border-blue-800/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-4 mt-auto">
                          {project.links.github && (
                            <Link href={project.links.github} target="_blank">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-black/30 backdrop-blur-md border-blue-500/30 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
                              >
                                <Github className="h-4 w-4 mr-2" />
                                GitHub
                              </Button>
                            </Link>
                          )}

                          {project.links.live && (
                            <Link href={project.links.live} target="_blank">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-black/30 backdrop-blur-md border-purple-500/30 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Live Demo
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section ref={techRef} className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black pointer-events-none"></div>
            <div className="container px-4 md:px-6 relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isTechInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-16 text-center"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                  Tech Stack
                </span>
              </motion.h2>

              {/* Tech Stack */}
              <div className="space-y-12">
                {categories.map((category) => (
                  <div key={category} className="space-y-4">
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={isTechInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5 }}
                      className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                    >
                      {category}
                    </motion.h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {technologies
                        .filter((tech) => tech.category === category)
                        .map((tech, index) => (
                          <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isTechInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-blue-500/20 p-4 h-full hover:border-blue-500/40 transition-colors duration-300"
                          >
                            <div className="flex flex-col items-center justify-center gap-3 p-2">
                              <div
                                className="text-3xl mb-2 w-16 h-16 flex items-center justify-center rounded-full"
                                style={{
                                  background: `radial-gradient(circle, ${tech.color}30 0%, transparent 70%)`,
                                }}
                              >
                                {tech.icon}
                              </div>

                              <h3
                                className="font-bold text-lg"
                                style={{
                                  color: tech.color,
                                  textShadow: `0 0 10px ${tech.color}80`,
                                }}
                              >
                                {tech.name}
                              </h3>

                              <div className="w-full mt-2">
                                <div className="h-1.5 w-full bg-blue-900/30 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={isTechInView ? { width: `${tech.level}%` } : {}}
                                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: tech.color }}
                                  />
                                </div>
                                <div className="flex justify-between mt-1 text-xs text-blue-300">
                                  <span>Proficiency</span>
                                  <span>{tech.level}%</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" ref={contactRef} className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black pointer-events-none"></div>
            <div className="container px-4 md:px-6 relative z-10">
              <div className="mx-auto max-w-4xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isContactInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-16 text-center"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Neural Link
                  </span>
                </motion.h2>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isContactInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-black/40 backdrop-blur-md border border-blue-500/20 rounded-xl overflow-hidden p-6"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Biometric authentication section */}
                    <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4 border border-blue-500/20 rounded-lg bg-blue-950/10">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isContactInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-6 text-center"
                      >
                        <h3 className="text-lg font-semibold mb-2 text-blue-300">Biometric Verification</h3>
                        <p className="text-sm text-blue-200/70">Scan to authenticate your neural signature</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isContactInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="relative mb-8"
                      >
                        <div className="w-32 h-32 rounded-full border-2 border-blue-500/30 flex items-center justify-center relative">
                          <Fingerprint
                            className={`w-20 h-20 ${scanComplete ? "text-green-400" : "text-blue-400"}`}
                            strokeWidth={1}
                          />

                          {/* Scanning animation */}
                          {pending && (
                            <motion.div
                              initial={{ top: 0 }}
                              animate={{ top: "100%" }}
                              transition={{ duration: 2, ease: "linear" }}
                              className="absolute left-0 right-0 h-1 bg-blue-500/50 z-10"
                            />
                          )}

                          {/* Scan complete indicator */}
                          {scanComplete && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute inset-0 rounded-full border-2 border-green-500 flex items-center justify-center"
                            >
                              <div className="absolute inset-0 rounded-full bg-green-500/10" />
                            </motion.div>
                          )}
                        </div>

                        {/* Rotating scanner effect */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/30 pointer-events-none"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isContactInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <Button
                          onClick={simulateBiometricScan}
                          disabled={pending || scanComplete}
                          className="bg-blue-600 hover:bg-blue-500 text-white"
                        >
                          {scanComplete ? <>Verified</> : pending ? <>Scanning...</> : <>Authenticate</>}
                        </Button>
                      </motion.div>
                    </div>

                    {/* Contact form section */}
                    <div className="w-full md:w-2/3">
                      <form action={handleSubmit} className="space-y-4">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={isContactInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <label htmlFor="name" className="block text-sm font-medium mb-2 text-blue-300">
                            Neural Identifier
                          </label>
                          <div className="relative">
                            <Input
                              id="name"
                              name="name"
                              value={formState.name}
                              onChange={handleChange}
                              required
                              disabled={!scanComplete}
                              className="bg-blue-950/10 border-blue-500/30 text-blue-100 focus:border-blue-400 focus:ring-blue-400/30"
                              placeholder="Enter your name"
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={isContactInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <label htmlFor="email" className="block text-sm font-medium mb-2 text-blue-300">
                            Quantum Address
                          </label>
                          <div className="relative">
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formState.email}
                              onChange={handleChange}
                              required
                              disabled={!scanComplete}
                              className="bg-blue-950/10 border-blue-500/30 text-blue-100 focus:border-blue-400 focus:ring-blue-400/30"
                              placeholder="Enter your email"
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={isContactInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          <label htmlFor="message" className="block text-sm font-medium mb-2 text-blue-300">
                            Neural Transmission
                          </label>
                          <div className="relative">
                            <Textarea
                              id="message"
                              name="message"
                              value={formState.message}
                              onChange={handleChange}
                              required
                              disabled={!scanComplete}
                              className="bg-blue-950/10 border-blue-500/30 text-blue-100 focus:border-blue-400 focus:ring-blue-400/30 min-h-[120px]"
                              placeholder="Enter your message"
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={isContactInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          <motion.div
                            whileHover={{ scale: scanComplete ? 1.02 : 1 }}
                            whileTap={{ scale: scanComplete ? 0.98 : 1 }}
                          >
                            <Button
                              type="submit"
                              disabled={pending || !scanComplete}
                              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-none relative overflow-hidden group"
                            >
                              <span className="relative z-10">
                                {pending ? "Transmitting..." : "Initiate Neural Link"}
                              </span>
                              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-blue-600/0 group-hover:via-blue-500/70 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                            </Button>
                          </motion.div>
                        </motion.div>

                        {message && (
                          <motion.p
                            className="text-sm text-center mt-4 text-blue-300"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {message}
                          </motion.p>
                        )}
                      </form>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
          <div className="container flex flex-col gap-2 sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6">
            <p className="text-xs text-neutral-500">© 2090 Manish Sharma. All neural rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link
                className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                href="#"
              >
                Terms of Neural Service
              </Link>
              <Link
                className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                href="#"
              >
                Quantum Privacy
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
