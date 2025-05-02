"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { useState } from "react"
import { submitContactForm } from "../actions"

interface ContactFormProps {
  inView: boolean
}

export default function ContactForm({ inView }: ContactFormProps) {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      const response = await submitContactForm(formData)
      setMessage(response.message)
      // Reset form
      setFormState({ name: "", email: "", message: "" })
    } catch (error) {
      setMessage("Something went wrong. Please try again.")
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

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
  }

  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={formVariants}>
      <Card className="p-6 bg-neutral-900/30 backdrop-blur-md border-neutral-800 rounded-lg overflow-hidden relative">
        {/* Glassmorphism effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-lg" />

        <form action={handleSubmit} className="space-y-4 relative z-10">
          <motion.div variants={inputVariants}>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-neutral-300">
              Name
            </label>
            <div className="relative group">
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="bg-neutral-900/50 border-neutral-700 text-neutral-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
              />
              <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          <motion.div variants={inputVariants}>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-neutral-300">
              Email
            </label>
            <div className="relative group">
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="bg-neutral-900/50 border-neutral-700 text-neutral-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
              />
              <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
              />
            </div>
          </motion.div>

          <motion.div variants={inputVariants}>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-neutral-300">
              Message
            </label>
            <div className="relative group">
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                className="bg-neutral-900/50 border-neutral-700 text-neutral-200 focus:border-purple-500 focus:ring-purple-500/20 min-h-[120px] transition-all duration-300"
              />
              <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              />
            </div>
          </motion.div>

          <motion.div variants={inputVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-none relative overflow-hidden group"
                disabled={pending}
              >
                <span className="relative z-10">{pending ? "Sending..." : "Send Message"}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/50 to-purple-600/0 group-hover:via-purple-500/70 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              </Button>
            </motion.div>
          </motion.div>

          {message && (
            <motion.p
              className="text-sm text-center mt-4 text-neutral-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.p>
          )}
        </form>
      </Card>
    </motion.div>
  )
}
