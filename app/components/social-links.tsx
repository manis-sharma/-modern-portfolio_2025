"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter, Instagram, Facebook } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type React from "react"

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  color?: string
}

export function SocialLink({ href, icon, label, color = "blue" }: SocialLinkProps) {
  const colorVariants = {
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400",
    purple: "bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400",
    pink: "bg-pink-500/10 border-pink-500/30 text-pink-400 hover:bg-pink-500/20 hover:border-pink-400",
    cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400",
    green: "bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-400",
  }

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
        <Button
          variant="outline"
          size="icon"
          className={`backdrop-blur-md transition-all duration-300 ${colorVariants[color as keyof typeof colorVariants]}`}
        >
          {icon}
          <span className="sr-only">{label}</span>
        </Button>
      </motion.div>
    </Link>
  )
}

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <SocialLink
        href="https://github.com/manis-sharma"
        icon={<Github className="h-4 w-4" />}
        label="GitHub"
        color="blue"
      />
      <SocialLink
        href="https://x.com/Manish_kharel1"
        icon={<Twitter className="h-4 w-4" />}
        label="Twitter"
        color="cyan"
      />
      <SocialLink
        href="https://www.instagram.com/manish_sharmawiss11/"
        icon={<Instagram className="h-4 w-4" />}
        label="Instagram"
        color="pink"
      />
      <SocialLink
        href="https://www.facebook.com/"
        icon={<Facebook className="h-4 w-4" />}
        label="Facebook"
        color="blue"
      />
      <SocialLink href="https://linkedin.com" icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" color="blue" />
      <SocialLink href="mailto:hello@example.com" icon={<Mail className="h-4 w-4" />} label="Email" color="purple" />
    </div>
  )
}
