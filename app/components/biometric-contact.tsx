"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Fingerprint, Eye, Lock, Scan } from "lucide-react"
import { submitContactForm } from "../actions"

export default function BiometricContact() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [scanComplete, setScanComplete] = useState(false)
  const [eyeTracking, setEyeTracking] = useState({ x: 50, y: 50 })

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  // Simulate eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      setEyeTracking({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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
    <div ref={containerRef} className="relative">
      {/* Biometric background */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-black/20" />

        {/* Fingerprint scan pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern
            id="fingerprint-pattern"
            patternUnits="userSpaceOnUse"
            width="100"
            height="100"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
            <line x1="10" y1="0" x2="10" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
            <line x1="20" y1="0" x2="20" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
            <line x1="30" y1="0" x2="30" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
            <line x1="40" y1="0" x2="40" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#fingerprint-pattern)" />
        </svg>

        {/* Eye tracking visualization */}
        <div
          className="absolute w-40 h-40 rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 70%)",
            left: `calc(${eyeTracking.x}% - 80px)`,
            top: `calc(${eyeTracking.y}% - 80px)`,
            transition: "left 0.3s ease-out, top 0.3s ease-out",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="bg-black/40 backdrop-blur-md border border-blue-500/20 rounded-xl overflow-hidden p-6"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Biometric authentication section */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4 border border-blue-500/20 rounded-lg bg-blue-950/10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 text-center"
            >
              <h3 className="text-lg font-semibold mb-2 text-blue-300">Biometric Verification</h3>
              <p className="text-sm text-blue-200/70">Scan to authenticate your neural signature</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
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
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                onClick={simulateBiometricScan}
                disabled={pending || scanComplete}
                className="bg-blue-600 hover:bg-blue-500 text-white"
              >
                {scanComplete ? (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Verified
                  </>
                ) : pending ? (
                  <>
                    <Scan className="mr-2 h-4 w-4 animate-pulse" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Fingerprint className="mr-2 h-4 w-4" />
                    Authenticate
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          {/* Contact form section */}
          <div className="w-full md:w-2/3">
            <form action={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
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
                    className="bg-blue-950/10 border-blue-500/30 text-blue-100 focus:border-blue-400 focus:ring-blue-400/30 pl-10"
                    placeholder="Enter your name"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Eye className="h-4 w-4 text-blue-500" />
                  </div>

                  {/* Eye tracking effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0"
                    initial={{ width: "0%" }}
                    animate={scanComplete ? { width: "100%" } : { width: "0%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
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
                    className="bg-blue-950/10 border-blue-500/30 text-blue-100 focus:border-blue-400 focus:ring-blue-400/30 pl-10"
                    placeholder="Enter your email"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Eye className="h-4 w-4 text-blue-500" />
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0"
                    initial={{ width: "0%" }}
                    animate={scanComplete ? { width: "100%" } : { width: "0%" }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
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
                    className="bg-blue-950/10 border-blue-500/30 text-blue-100 focus:border-blue-400 focus:ring-blue-400/30 min-h-[120px] pl-10"
                    placeholder="Enter your message"
                  />
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <Eye className="h-4 w-4 text-blue-500" />
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0"
                    initial={{ width: "0%" }}
                    animate={scanComplete ? { width: "100%" } : { width: "0%" }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
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
                    <span className="relative z-10">{pending ? "Transmitting..." : "Initiate Neural Link"}</span>
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
  )
}
