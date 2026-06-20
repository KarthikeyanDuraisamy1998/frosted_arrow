'use client'
import { Canvas } from '@react-three/fiber'
import Model from './Model';
import { Environment } from '@react-three/drei'

export default function index() {
  return (
    <Canvas style={{ background: 'transparent' }} gl={{ alpha: true }}>
      <Model />
      <directionalLight intensity={1} position={[0, 3, 3]} />
      <Environment preset="city" background={false} />
    </Canvas>
  )
}