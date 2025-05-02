"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type * as THREE from "three"
import { EffectComposer, Bloom } from "@react-three/postprocessing"

function Grid() {
  const gridRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = (clock.getElapsedTime() * 0.15) % 1
    }
  })

  const gridSize = 20
  const gridDivisions = 20

  return (
    <group ref={gridRef}>
      {Array.from({ length: gridSize }).map((_, i) => (
        <line key={`grid-x-${i}`}>
          <bufferGeometry>
            <float32BufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([-gridSize / 2, -0.1, i - gridSize / 2, gridSize / 2, -0.1, i - gridSize / 2]),
                3,
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#0369a1" opacity={0.2} transparent />
        </line>
      ))}

      {Array.from({ length: gridSize }).map((_, i) => (
        <line key={`grid-z-${i}`}>
          <bufferGeometry>
            <float32BufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([i - gridSize / 2, -0.1, -gridSize / 2, i - gridSize / 2, -0.1, gridSize / 2]),
                3,
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#0369a1" opacity={0.2} transparent />
        </line>
      ))}
    </group>
  )
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.02
      starsRef.current.rotation.z = clock.getElapsedTime() * 0.01
    }
  })

  const starCount = 1000
  const positions = new Float32Array(starCount * 3)
  const colors = new Float32Array(starCount * 3)

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 50
    positions[i3 + 1] = (Math.random() - 0.5) * 50
    positions[i3 + 2] = (Math.random() - 0.5) * 50

    // Colors: blue to purple gradient
    colors[i3] = 0.2 + Math.random() * 0.3 // R
    colors[i3 + 1] = 0.3 + Math.random() * 0.4 // G
    colors[i3 + 2] = 0.8 + Math.random() * 0.2 // B
  }

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} />
    </points>
  )
}

export default function FuturisticBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
        <color attach="background" args={["#050510"]} />
        <fog attach="fog" args={["#050510", 5, 30]} />

        <Grid />
        <Stars />

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
