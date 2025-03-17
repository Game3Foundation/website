'use client'

import { useRef, useEffect, useState } from 'react'
import { useFrame, createPortal } from '@react-three/fiber'
import * as THREE from 'three'
import dynamic from 'next/dynamic'

// Dynamically import Canvas to avoid SSR issues
const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), { ssr: false })

// Rectangle with skewed geometry
function SkewedRect({
	position,
	width,
	height,
	color,
	delay,
	parallaxFactor,
	scrollY,
}: {
	position: [number, number, number]
	width: number
	height: number
	color: THREE.Color
	delay: number
	parallaxFactor: number
	scrollY: number
}) {
	const meshRef = useRef<THREE.Mesh>(null)
	const [visible, setVisible] = useState(false)
	const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)

	// Create skewed geometry
	useEffect(() => {
		const geo = new THREE.PlaneGeometry(width, height, 1, 1)
		const positionAttribute = geo.getAttribute('position')
		const positions = positionAttribute.array as Float32Array

		// Skew the geometry by 45 degrees
		for (let i = 0; i < positions.length; i += 3) {
			positions[i] += positions[i + 1] * 0.5 // Apply 45 degree skew
		}

		geo.computeVertexNormals()
		setGeometry(geo)
	}, [width, height])

	// Animate in on load with delay
	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(true)
		}, delay)

		return () => clearTimeout(timer)
	}, [delay])

	useFrame(() => {
		if (!meshRef.current) return

		// Apply parallax effect based on scroll
		const parallaxOffset = scrollY * parallaxFactor
		meshRef.current.position.y = position[1] + parallaxOffset

		// Fade in animation on load
		if (visible && meshRef.current.material instanceof THREE.Material) {
			meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, 1, 0.05)
		}
	})

	if (!geometry) return null

	return (
		<mesh ref={meshRef} position={position} geometry={geometry} renderOrder={position[2]}>
			<meshBasicMaterial
				color={color}
				transparent={true}
				opacity={0}
				side={THREE.DoubleSide}
				toneMapped={false}
			/>
		</mesh>
	)
}

// Scene component
function Scene({ scrollY }: { scrollY: number }) {
	// Define color palette
	const colorPalette = [
		new THREE.Color('#FF9900'), // Orange
		new THREE.Color('#FF5E5E'), // Pink-red
		new THREE.Color('#FFCC00'), // Yellow
		new THREE.Color('#FF66B2'), // Pink
	]

	// Generate rectangles with random properties
	const [rectangles, setRectangles] = useState<any[]>([])

	useEffect(() => {
		const count = 15 // Number of rectangles
		const rects = []

		for (let i = 0; i < count; i++) {
			const width = 2 + Math.random() * 4
			const height = 0.5 + Math.random() * 1.5
			const xPos = -5 + Math.random() * 10
			const yPos = -4 + (i / count) * 10 // Distribute vertically
			const zPos = Math.random() * -3 // Different depths for parallax
			const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
			const delay = 500 + i * 150 // Staggered animation
			const parallaxFactor = 0.005 * (zPos / -3) // Parallax based on depth

			rects.push({
				id: i,
				position: [xPos, yPos, zPos] as [number, number, number],
				width,
				height,
				color,
				delay,
				parallaxFactor,
			})
		}

		setRectangles(rects)
	}, [])

	return (
		<>
			{rectangles.map((rect) => (
				<SkewedRect
					key={rect.id}
					position={rect.position}
					width={rect.width}
					height={rect.height}
					color={rect.color}
					delay={rect.delay}
					parallaxFactor={rect.parallaxFactor}
					scrollY={scrollY}
				/>
			))}
		</>
	)
}

export default function SkewedRectanglesEffect() {
	const [mounted, setMounted] = useState(false)
	const [scrollY, setScrollY] = useState(0)

	// Only render on client
	useEffect(() => {
		setMounted(true)
	}, [])

	// Track scroll position
	useEffect(() => {
		if (!mounted) return

		const handleScroll = () => {
			setScrollY(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [mounted])

	if (!mounted) return null

	return (
		<div className="fixed inset-0 pointer-events-none z-0 opacity-50">
			<Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
				<Scene scrollY={scrollY} />
			</Canvas>
		</div>
	)
}
