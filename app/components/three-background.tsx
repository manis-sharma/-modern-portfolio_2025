"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sparkles, Cloud, Float } from "@react-three/drei"
import { Vector3, type Mesh, type Group, MathUtils } from "three"
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"
import { motion } from "framer-motion-3d"
import { MotionConfig } from "framer-motion"

function FloatingGrid() {
  const gridRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = (clock.getElapsedTime() * 0.15) % 1
      gridRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.05
    }
  })

  return (
    <group ref={gridRef} position={[0, -2, 0]}>
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`grid-x-${i}`}>
          <bufferGeometry>
            <float32BufferAttribute
              attach="attributes-position"
              args={[new Float32Array([-10, 0, i - 10, 10, 0, i - 10]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#0369a1" opacity={0.2} transparent />
        </line>
      ))}

      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`grid-z-${i}`}>
          <bufferGeometry>
            <float32BufferAttribute
              attach="attributes-position"
              args={[new Float32Array([i - 10, 0, -10, i - 10, 0, 10]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#0369a1" opacity={0.2} transparent />
        </line>
      ))}
    </group>
  )
}

function FloatingOrbs() {
  const orbs = useRef<Group>(null)
  const { viewport } = useThree()

  useFrame(({ clock, mouse }) => {
    if (orbs.current) {
      orbs.current.rotation.y = clock.getElapsedTime() * 0.05
      orbs.current.position.x = MathUtils.lerp(orbs.current.position.x, (mouse.x * viewport.width) / 4, 0.05)
      orbs.current.position.y = MathUtils.lerp(orbs.current.position.y, (mouse.y * viewport.height) / 4, 0.05)
    }
  })

  return (
    <group ref={orbs}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <motion.mesh
          position={[2, 1, -2]}
          animate={{
            y: [1, 1.5, 1],
            rotateY: [0, Math.PI * 2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#4c00ff"
            emissive="#4c00ff"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </motion.mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <motion.mesh
          position={[-2.5, -1, -1]}
          animate={{
            y: [-1, -0.5, -1],
            rotateY: [0, Math.PI * 2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </motion.mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
        <motion.mesh
          position={[1, -2, 0]}
          animate={{
            y: [-2, -1.5, -2],
            rotateY: [0, Math.PI * 2],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#ff00aa"
            emissive="#ff00aa"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </motion.mesh>
      </Float>
    </group>
  )
}

function DigitalTerrain() {
  const terrainRef = useRef<Mesh>(null)
  const { viewport } = useThree()

  useFrame(({ clock, mouse }) => {
    if (terrainRef.current) {
      terrainRef.current.rotation.z = clock.getElapsedTime() * 0.05
      terrainRef.current.position.x = MathUtils.lerp(
        terrainRef.current.position.x,
        (mouse.x * viewport.width) / 8,
        0.01,
      )
      terrainRef.current.position.y = MathUtils.lerp(
        terrainRef.current.position.y,
        (mouse.y * viewport.height) / 8,
        0.01,
      )
    }
  })

  return (
    <mesh ref={terrainRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[30, 30, 64, 64]} />
      <meshStandardMaterial color="#000000" wireframe emissive="#0066ff" emissiveIntensity={0.2} />
    </mesh>
  )
}

function Scene({ scrollY }: { scrollY: number }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 10)
  }, [camera])

  useFrame(() => {
    camera.position.y = MathUtils.lerp(camera.position.y, -scrollY / 500, 0.05)
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#0066ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00aa" />

      <FloatingGrid />
      <DigitalTerrain />
      <FloatingOrbs />

      <Sparkles count={200} scale={10} size={2} speed={0.3} color="#ffffff" />
      <Cloud position={[0, 5, -10]} speed={0.2} opacity={0.1} width={10} depth={1.5} segments={20} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        <ChromaticAberration offset={new Vector3(0.0005, 0.0005, 0.0005)} />
      </EffectComposer>
    </>
  )
}

export default function ThreeBackground({ scrollY }: { scrollY: number }) {
  return (
    <div className="fixed inset-0 z-0">
      <MotionConfig transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Scene scrollY={scrollY} />
        </Canvas>
      </MotionConfig>
    </div>
  )
}
