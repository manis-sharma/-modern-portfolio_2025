"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface TechStackProps {
  inView: boolean
}

const technologies = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Redux", "GraphQL"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB"],
  },
  {
    category: "DevOps",
    skills: ["Docker", "AWS", "CI/CD", "Git", "Linux", "Nginx"],
  },
  {
    category: "Tools",
    skills: ["VS Code", "Postman", "Figma", "Jest", "GitHub", "Vercel"],
  },
]

export default function TechStack({ inView }: TechStackProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2"
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {technologies.map((tech, index) => (
        <motion.div key={tech.category} variants={item} custom={index}>
          <Card className="p-6 bg-neutral-900/30 backdrop-blur-md border-neutral-800 rounded-lg overflow-hidden relative group hover:bg-neutral-900/40 transition-colors duration-300">
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {tech.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {tech.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.05 * i + 0.2 * index }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
                    scale: 1.05,
                  }}
                  className="inline-flex items-center rounded-full bg-blue-950/30 px-2.5 py-1 text-xs font-medium text-blue-300 border border-blue-800/30"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Subtle border glow on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-lg opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: "inset 0 0 0 1px rgba(59, 130, 246, 0.3)",
              }}
            />
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
