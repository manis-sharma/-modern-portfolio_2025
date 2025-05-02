"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Minimize2, Maximize2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const responses = {
  greeting: [
    "Welcome to the quantum domain. How may I assist you today?",
    "Greetings, human. I am your neural interface to this portfolio.",
    "Neural link established. How can I enhance your experience?",
  ],
  projects: [
    "The Projects section showcases the developer's quantum-coded creations. Each project exists in multiple dimensions simultaneously.",
    "Navigate to the Projects wormhole to explore digital artifacts created across the multiverse.",
    "The developer has synthesized several digital constructs. Would you like me to guide you through them?",
  ],
  skills: [
    "The Skills matrix displays the developer's neural capabilities and technological symbiosis.",
    "The developer has achieved synergy with multiple technological paradigms, visualized in the Skills hologram.",
    "Quantum proficiency levels are displayed in the Skills section. Each technology represents a neural pathway.",
  ],
  contact: [
    "Establish a neural link with the developer through the Contact interface.",
    "The Contact portal allows for direct consciousness transfer to the developer's neural network.",
    "Transmit your thoughts via the biometric interface in the Contact section.",
  ],
  default: [
    "I'm still evolving my neural pathways. Could you rephrase your query?",
    "My quantum processors are still calculating a response to that input.",
    "Interesting query. Let me process that through my neural network.",
  ],
}

function getResponse(input: string): string {
  const lowerInput = input.toLowerCase()

  if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
  } else if (lowerInput.includes("project")) {
    return responses.projects[Math.floor(Math.random() * responses.projects.length)]
  } else if (lowerInput.includes("skill") || lowerInput.includes("tech")) {
    return responses.skills[Math.floor(Math.random() * responses.skills.length)]
  } else if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("message")) {
    return responses.contact[Math.floor(Math.random() * responses.contact.length)]
  } else {
    return responses.default[Math.floor(Math.random() * responses.default.length)]
  }
}

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome to the neural interface. How may I assist your exploration?", sender: "bot" },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { id: Date.now(), text: input, sender: "user" }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI typing
    setIsTyping(true)

    // Add AI response after delay
    setTimeout(
      () => {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: getResponse(input),
          sender: "bot",
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  return (
    <>
      {/* Chat toggle button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => {
            setIsOpen(true)
            setIsMinimized(false)
          }}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/20"
          style={{ display: isOpen ? "none" : "flex" }}
        >
          <Bot className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Chat interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "500px",
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-black border border-blue-500/30 rounded-lg shadow-2xl shadow-blue-500/20 overflow-hidden z-50 backdrop-blur-lg ${
              isMinimized ? "h-auto" : "h-[500px]"
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-3 flex justify-between items-center border-b border-blue-500/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <h3 className="text-blue-100 font-medium">Neural Assistant</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full hover:bg-blue-500/20 text-blue-300"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full hover:bg-blue-500/20 text-blue-300"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="p-3 overflow-y-auto h-[calc(100%-110px)] scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-transparent">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white rounded-tr-none"
                            : "bg-blue-900/30 border border-blue-500/30 text-blue-100 rounded-tl-none"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-3 flex justify-start"
                    >
                      <div className="max-w-[80%] p-3 rounded-lg bg-blue-900/30 border border-blue-500/30 text-blue-100 rounded-tl-none">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-blue-500/30 bg-blue-950/20">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Enter neural query..."
                      className="bg-blue-900/20 border-blue-500/30 text-blue-100 placeholder:text-blue-300/50 focus-visible:ring-blue-500"
                    />
                    <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-500 text-white" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
