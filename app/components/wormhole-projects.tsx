"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  links: {
    github?: string
    live?: string
  }
}

const projects: Project[] = [
  {
    id: "quantum-ecommerce",
    title: "Quantum E-commerce",
    description: "A full-stack e-commerce platform with instant quantum data loading and holographic product displays.",
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

export default function WormholeProjects() {
  const [activeProject, setActiveProject] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <div ref={containerRef} className="relative min-h-[600px]">
      {/* Wormhole background effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-50" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView
              ? {
                  opacity: [0, 0.5, 0.2],
                  scale: [0.8, 1.2, 1],
                  rotate: [0, 90],
                }
              : {}
          }
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 blur-sm" />
          <div className="absolute inset-[10%] rounded-full border-2 border-purple-500/20 blur-sm" />
          <div className="absolute inset-[20%] rounded-full border-2 border-cyan-500/20 blur-sm" />
          <div className="absolute inset-[30%] rounded-full border-2 border-blue-500/20 blur-sm" />
          <div className="absolute inset-[40%] rounded-full border-2 border-purple-500/20 blur-sm" />
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* Navigation controls */}
        <div className="flex justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={prevProject}
              className="bg-black/30 backdrop-blur-md border-blue-500/30 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={nextProject}
              className="bg-black/30 backdrop-blur-md border-blue-500/30 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Project carousel */}
        <div className="relative overflow-hidden rounded-xl h-[500px]">
          <AnimatePresence mode="wait">
            {projects.map(
              (project, index) =>
                index === activeProject && (
                  <motion.div
                    key={project.id}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      rotateY: -30,
                      z: -200,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotateY: 0,
                      z: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      rotateY: 30,
                      z: -200,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.5,
                    }}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                    }}
                    className="bg-black/40 backdrop-blur-md border border-blue-500/20 rounded-xl overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                      <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="p-6 flex flex-col justify-center">
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                        >
                          {project.title}
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="text-neutral-300 mb-6"
                        >
                          {project.description}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="flex flex-wrap gap-2 mb-6"
                        >
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center rounded-full bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-300 border border-blue-500/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="flex gap-4 mt-auto"
                        >
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
                        </motion.div>
                      </div>
                    </div>

                    {/* Holographic edge effect */}
                    <div className="absolute inset-0 pointer-events-none rounded-xl">
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                      <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
                      <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>

        {/* Project indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeProject ? "bg-blue-500 scale-125" : "bg-blue-500/30 hover:bg-blue-500/50"
              }`}
              aria-label={`View project ${project.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
