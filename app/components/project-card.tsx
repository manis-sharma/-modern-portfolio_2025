"use client"

import { Card } from "@/components/ui/card"
import { Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
  index: number
}

export default function ProjectCard({ title, description, image, link, tags, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        whileHover={{
          scale: 1.02,
          rotateY: 5,
          rotateX: -5,
          z: 10,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{ perspective: "1000px" }}
      >
        <Card className="overflow-hidden h-full bg-neutral-900/30 backdrop-blur-md border-neutral-800 group">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              animate={{ opacity: hovered ? 0.9 : 0.7 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="p-5 relative">
            <motion.h3
              className="font-semibold text-xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
              animate={{ y: hovered ? -2 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-sm text-neutral-400 mb-4"
              animate={{ opacity: hovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {description}
            </motion.p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                  className="inline-flex items-center rounded-full bg-blue-950/30 px-2.5 py-0.5 text-xs font-medium text-blue-300 border border-blue-800/30"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <Link href={link} target="_blank">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </motion.div>
            </Link>
          </div>

          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-lg"
            animate={{
              boxShadow: hovered
                ? "0 0 20px 2px rgba(56, 189, 248, 0.3), inset 0 0 20px 2px rgba(56, 189, 248, 0.1)"
                : "0 0 0px 0px rgba(56, 189, 248, 0), inset 0 0 0px 0px rgba(56, 189, 248, 0)",
            }}
            transition={{ duration: 0.3 }}
          />
        </Card>
      </motion.div>
    </motion.div>
  )
}
