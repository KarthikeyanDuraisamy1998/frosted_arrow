'use client'
import { Canvas } from '@react-three/fiber'
import Model from './Model';
import { Environment } from '@react-three/drei'

export default function Index() {
  return (
    <Canvas style={{ background: '#00000000' }}>
      <Model />
      <directionalLight intensity={1} position={[0, 3, 3]} />
      <Environment preset="city" />
    </Canvas>
  )
}



