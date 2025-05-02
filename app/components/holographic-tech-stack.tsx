"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useInView } from "framer-motion"

interface Technology {
  name: string
  icon: string
  color: string
  category: string
  level: number
}

const technologies: Technology[] = [
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

function TechBadge({ tech, index }: { tech: Technology; index: number }) {
  const badgeRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(badgeRef, { once: true, amount: 0.3 })

  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const springConfig = { damping: 15, stiffness: 150 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = badgeRef.current?.getBoundingClientRect()
    if (!rect) return

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={badgeRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        perspective: 1000,
      }}
      className="relative"
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ z: 10 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group cursor-pointer"
      >
        <div
          className="relative bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-blue-500/20 p-4 h-full"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Holographic overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(45deg, transparent, ${tech.color}40, transparent)`,
              transform: "translateZ(20px)",
            }}
          />

          {/* Tech content */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-3 p-2">
            <div
              className="text-3xl mb-2 w-16 h-16 flex items-center justify-center rounded-full"
              style={{
                background: `radial-gradient(circle, ${tech.color}30 0%, transparent 70%)`,
                transform: "translateZ(30px)",
              }}
            >
              {tech.icon}
            </div>

            <h3
              className="font-bold text-lg"
              style={{
                color: tech.color,
                textShadow: `0 0 10px ${tech.color}80`,
                transform: "translateZ(25px)",
              }}
            >
              {tech.name}
            </h3>

            <div className="w-full mt-2" style={{ transform: "translateZ(20px)" }}>
              <div className="h-1.5 w-full bg-blue-900/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${tech.level}%` } : {}}
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

          {/* Edge glow effect */}
          <motion.div
            animate={{
              boxShadow: isHovered
                ? `0 0 20px 2px ${tech.color}50, inset 0 0 20px 2px ${tech.color}30`
                : `0 0 0px 0px ${tech.color}00, inset 0 0 0px 0px ${tech.color}00`,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-xl pointer-events-none"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HolographicTechStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  const categories = [...new Set(technologies.map((tech) => tech.category))]

  return (
    <div ref={containerRef} className="relative">
      {/* Holographic grid background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-purple-900/5 to-blue-900/5 pointer-events-none -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 40%), 
                            radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.1) 0%, transparent 40%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundSize: "40px 40px",
            backgroundImage: `linear-gradient(to right, rgba(56, 189, 248, 0.1) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(56, 189, 248, 0.1) 1px, transparent 1px)`,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="space-y-12"
      >
        {categories.map((category) => (
          <div key={category} className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            >
              {category}
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies
                .filter((tech) => tech.category === category)
                .map((tech, index) => (
                  <TechBadge key={tech.name} tech={tech} index={index} />
                ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
