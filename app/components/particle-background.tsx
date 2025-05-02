"use client"

import { useRef, useEffect } from "react"
import { motion, type MotionValue } from "framer-motion"

interface ParticleBackgroundProps {
  scrollYProgress: MotionValue<number>
}

export default function ParticleBackground({ scrollYProgress }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      originalY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originalY = this.y
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.2 - 0.1

        // Color palette: blue, cyan, purple
        const colors = [
          "rgba(56, 189, 248, 0.7)", // cyan
          "rgba(59, 130, 246, 0.7)", // blue
          "rgba(139, 92, 246, 0.7)", // purple
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update(scrollOffset: number) {
        this.x += this.speedX
        this.y = this.originalY + scrollOffset * 100

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Add subtle glow
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color
      }
    }

    // Create particles
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000))
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let scrollOffset = 0
    const unsubscribeScroll = scrollYProgress.onChange((value) => {
      scrollOffset = value
    })

    function animate() {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(scrollOffset)
        particle.draw()
      })

      // Draw connections between particles
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect particles with lines if they are close enough
    function connectParticles() {
      if (!ctx) return

      const maxDistance = 150 * (canvas.width / 1920) // Scale with screen size

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // Calculate opacity based on distance
            const opacity = 1 - distance / maxDistance
            const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)

            gradient.addColorStop(0, particles[i].color.replace("0.7", `${opacity * 0.3}`))
            gradient.addColorStop(1, particles[j].color.replace("0.7", `${opacity * 0.3}`))

            ctx.beginPath()
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      unsubscribeScroll()
    }
  }, [scrollYProgress])

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
