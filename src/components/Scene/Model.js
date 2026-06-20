'use client'
import React, { useEffect, useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF, Clone, Center, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { MathUtils } from 'three'

export default function Model() {
    const { scene } = useGLTF('/medias/arrow-optimized.glb')
    const { viewport } = useThree()

    const arrow = useRef(null)

    const mouse = useRef({
        x: 0,
        y: 0,
        active: false,
    })

    const BASE_X = 0
    const BASE_Y = 0.05
    const BASE_Z = 0

    const materialProps = {
        thickness: 1.0,
        roughness: 0.3,
        transmission: 1,
        ior: 1.4,
        chromaticAberration: 0.09,
        backside: true,

        distortion: 0.25,
        distortionScale: 0.6,
        temporalDistortion: 0.12,
        aniostropic: 0.5,
        
    }

    useEffect(() => {
        const handlePointerMove = (event) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
            mouse.current.active = true
        }

        const handlePointerLeave = () => {
            mouse.current.active = false
        }

        const handleBlur = () => {
            mouse.current.active = false
        }

        window.addEventListener('pointermove', handlePointerMove)
        document.documentElement.addEventListener('pointerleave', handlePointerLeave)
        window.addEventListener('blur', handleBlur)

        return () => {
            window.removeEventListener('pointermove', handlePointerMove)
            document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
            window.removeEventListener('blur', handleBlur)
        }
    }, [])

    useFrame((_, delta) => {
        if (!arrow.current) return

        const activeAmount = mouse.current.active ? 1 : 0

        const mouseX = mouse.current.x * activeAmount
        const mouseY = mouse.current.y * activeAmount

        // Subtle viewport magnet movement
        const targetX = BASE_X + mouseX * 0.15
        const targetY = BASE_Y + mouseY * 0.1
        const targetZ = BASE_Z

        arrow.current.position.x = MathUtils.damp(
            arrow.current.position.x,
            targetX,
            5,
            delta
        )

        arrow.current.position.y = MathUtils.damp(
            arrow.current.position.y,
            targetY,
            5,
            delta
        )

        arrow.current.position.z = MathUtils.damp(
            arrow.current.position.z,
            targetZ,
            5,
            delta
        )

        // Viewport tilt
        const targetRotX = -mouseY * 0.28
        const targetRotY = mouseX * 0.38
        const targetRotZ = -mouseX * 0.12

        arrow.current.rotation.x = MathUtils.damp(
            arrow.current.rotation.x,
            targetRotX,
            5,
            delta
        )

        arrow.current.rotation.y = MathUtils.damp(
            arrow.current.rotation.y,
            targetRotY,
            5,
            delta
        )

        arrow.current.rotation.z = MathUtils.damp(
            arrow.current.rotation.z,
            targetRotZ,
            5,
            delta
        )
    })

    return (
        <group scale={viewport.width / 3.75}>
            {/* <Text
                font="/fonts/PPNeueMontreal-Bold.otf"
                position={[0, 0, -1.8]}
                fontSize={0.55}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                hello world!
            </Text> */}

            <group
                ref={arrow}
                position={[BASE_X, BASE_Y, BASE_Z]}
            >
                <Center>
                    <Clone
                        object={scene}
                        scale={0.1}
                        position={[0, 0, 0]}
                        inject={<MeshTransmissionMaterial {...materialProps} />}
                    />
                </Center>
            </group>
        </group>
    )
}

useGLTF.preload('/medias/arrow-optimized.glb')