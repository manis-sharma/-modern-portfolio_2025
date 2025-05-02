"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function GradientBackground({ scrollY }: { scrollY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let animationFrameId: number
    let time = 0

    // Draw gradient background
    const draw = () => {
      time += 0.005

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create background gradient based on theme
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)

      if (isDark) {
        // Dark theme
        bgGradient.addColorStop(0, "#050510")
        bgGradient.addColorStop(1, "#0a0a20")
      } else {
        // Light theme
        bgGradient.addColorStop(0, "#f0f4ff")
        bgGradient.addColorStop(1, "#e0e7ff")
      }

      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      const gridSize = 40
      const gridOffset = (time * 20) % gridSize

      // Grid color based on theme
      ctx.strokeStyle = isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 1

      // Horizontal lines
      for (let y = gridOffset; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical lines
      for (let x = gridOffset; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw glowing orbs with theme-appropriate colors
      const orbs = [
        {
          x: canvas.width * 0.2,
          y: canvas.height * 0.3,
          radius: 100,
          color: isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(56, 189, 248, 0.05)",
        },
        {
          x: canvas.width * 0.8,
          y: canvas.height * 0.7,
          radius: 150,
          color: isDark ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0.05)",
        },
        {
          x: canvas.width * 0.5,
          y: canvas.height * 0.5 + Math.sin(time) * 50,
          radius: 200,
          color: isDark ? "rgba(236, 72, 153, 0.1)" : "rgba(236, 72, 153, 0.05)",
        },
      ]

      orbs.forEach((orb) => {
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
        gradient.addColorStop(0, orb.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Apply scroll effect
      ctx.fillStyle = isDark
        ? `rgba(5, 5, 16, ${Math.min(scrollY / 1000, 0.5)})`
        : `rgba(240, 244, 255, ${Math.min(scrollY / 1000, 0.5)})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = window.requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [scrollY, isDark])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
