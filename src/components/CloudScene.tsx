import { useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

interface CloudBlobProps {
  position: [number, number, number]
  scale: number
  opacity: number
}

function CloudBlob({ position, scale, opacity }: CloudBlobProps) {
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xddeeff),
    transparent: true,
    opacity,
    roughness: 1,
    metalness: 0,
    depthWrite: false,
  }), [opacity])
  
  return (
    <mesh position={position} scale={scale} material={material}>
      <sphereGeometry args={[1, 16, 16]} />
    </mesh>
  )
}

interface CloudClusterProps {
  groupPosition: [number, number, number]
  scale?: number
  mouseX?: number
  mouseY?: number
}

function CloudCluster({ groupPosition, scale = 1, mouseX = 0, mouseY = 0 }: CloudClusterProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  const blobs: CloudBlobProps[] = useMemo(() => [
    { position: [0, 0, 0], scale: 1.4, opacity: 0.85 },
    { position: [1.2, 0.3, -0.5], scale: 1.1, opacity: 0.75 },
    { position: [-1.0, 0.2, -0.3], scale: 1.0, opacity: 0.70 },
    { position: [0.5, 0.7, 0.2], scale: 0.9, opacity: 0.80 },
    { position: [-0.6, -0.2, 0.3], scale: 0.8, opacity: 0.65 },
    { position: [1.8, -0.1, 0.1], scale: 0.7, opacity: 0.60 },
    { position: [-1.7, 0.1, 0.0], scale: 0.75, opacity: 0.55 },
    { position: [0.2, -0.5, 0.5], scale: 0.85, opacity: 0.70 },
  ], [])
  
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.08
      groupRef.current.position.y = groupPosition[1] + Math.sin(t * 0.3) * 0.08
      groupRef.current.rotation.x = mouseY * 0.05
      groupRef.current.rotation.y += mouseX * 0.03
    }
  })
  
  return (
    <group ref={groupRef} position={groupPosition} scale={scale}>
      {blobs.map((blob, i) => (
        <CloudBlob key={i} {...blob} />
      ))}
    </group>
  )
}

function BackgroundClouds() {
  const cloudsData = useMemo(() => [
    { position: [-5, 1.5, -3] as [number, number, number], scale: 0.6 },
    { position: [5, -0.5, -4] as [number, number, number], scale: 0.5 },
    { position: [-4, -1.5, -2] as [number, number, number], scale: 0.4 },
    { position: [3.5, 2, -5] as [number, number, number], scale: 0.45 },
  ], [])
  
  return (
    <>
      {cloudsData.map((cloud, i) => (
        <Float key={i} speed={0.5 + i * 0.2} rotationIntensity={0.05} floatIntensity={0.3}>
          <CloudCluster groupPosition={cloud.position} scale={cloud.scale} />
        </Float>
      ))}
    </>
  )
}

function Scene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <>
      <ambientLight intensity={0.4} color={new THREE.Color(0xb8d4f0)} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        color={new THREE.Color(0xffeedd)}
      />
      <directionalLight
        position={[-5, -3, -5]}
        intensity={0.2}
        color={new THREE.Color(0x4488bb)}
      />
      
      <CloudCluster groupPosition={[0, 0, 0]} scale={1} mouseX={mouseX} mouseY={mouseY} />
      <BackgroundClouds />
      
      <Sparkles
        count={60}
        scale={10}
        size={0.5}
        speed={0.2}
        opacity={0.3}
        color={new THREE.Color(0xb8d4f0)}
      />
    </>
  )
}

interface CloudSceneProps {
  mouseX?: number
  mouseY?: number
  className?: string
}

export default function CloudScene({ mouseX = 0, mouseY = 0, className = '' }: CloudSceneProps) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (prefersReducedMotion) {
    return (
      <div className={`flex items-center justify-center ${className}`} aria-label="Stylized cloud illustration">
        <div className="relative w-48 h-32">
          <div className="absolute inset-0 rounded-full bg-white/10 blur-xl" />
          <div className="absolute top-4 left-8 w-32 h-20 rounded-full bg-white/15 blur-lg" />
          <div className="absolute top-6 left-4 w-20 h-16 rounded-full bg-white/10 blur-md" />
        </div>
      </div>
    )
  }
  
  return (
    <div className={className} aria-label="Interactive 3D cloud scene">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Scene mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  )
}
