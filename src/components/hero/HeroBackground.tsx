'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

// Shape coordinates for the number 3
function createNumber3Points(count = 2000) {
	// These coordinates roughly define the shape of a "3"
	const shape = [
		// Top curve
		...Array.from({ length: 100 }, (_, i) => ({
			x: Math.cos(Math.PI * (i / 100)) * 1.5,
			y: 3 + Math.sin(Math.PI * (i / 100)) * 1,
			z: (Math.random() - 0.5) * 0.5,
		})),
		// Middle curve
		...Array.from({ length: 100 }, (_, i) => ({
			x: Math.cos(Math.PI * (i / 100)) * 1.2,
			y: 0 + Math.sin(Math.PI * (i / 100)) * 0.8,
			z: (Math.random() - 0.5) * 0.5,
		})),
		// Bottom curve
		...Array.from({ length: 100 }, (_, i) => ({
			x: Math.cos(Math.PI * (i / 100)) * 1.5,
			y: -3 + Math.sin(Math.PI * (i / 100)) * 1,
			z: (Math.random() - 0.5) * 0.5,
		})),
	]

	// Add some random points around the shape for a more nebulous effect
	const randomPoints = Array.from({ length: count - 300 }, () => ({
		x: (Math.random() - 0.5) * 5,
		y: (Math.random() - 0.5) * 8,
		z: (Math.random() - 0.5) * 0.5,
	}))

	// Combine and convert to Vector3 array
	return [...shape, ...randomPoints].map(({ x, y, z }) => new THREE.Vector3(x, y, z))
}

// Create a circular dot texture
function createDotTexture() {
	// This function creates the texture on the client side only
	if (typeof window === 'undefined') return null

	const canvas = document.createElement('canvas')
	canvas.width = 64
	canvas.height = 64
	const context = canvas.getContext('2d')

	const centerX = canvas.width / 2
	const centerY = canvas.height / 2
	const radius = canvas.width / 2

	context.beginPath()
	context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
	context.fillStyle = 'white'
	context.fill()

	const texture = new THREE.CanvasTexture(canvas)
	texture.needsUpdate = true
	return texture
}

function PointCloud() {
	const pointsRef = useRef()
	const { viewport, mouse } = useThree()
	const [dotTexture, setDotTexture] = useState(null)

	// Initialize texture on client side only
	useEffect(() => {
		setDotTexture(createDotTexture())
	}, [])

	// Initialize points in the shape of number 3
	const points = useMemo(() => createNumber3Points(2500), [])

	// Create geometry from points
	const geometry = useMemo(() => {
		const geometry = new THREE.BufferGeometry()
		const positions = new Float32Array(points.length * 3)
		const colors = new Float32Array(points.length * 3)
		const sizes = new Float32Array(points.length)

		points.forEach((point, i) => {
			positions[i * 3] = point.x
			positions[i * 3 + 1] = point.y
			positions[i * 3 + 2] = point.z

			// Orange-gold color theme with slight variation
			colors[i * 3] = 1.0 // R - Full red for orange
			colors[i * 3 + 1] = 0.5 + Math.random() * 0.2 // G - Varied green for orange shade
			colors[i * 3 + 2] = 0.1 // B - Low blue for orange

			// Uniform dot sizes
			sizes[i] = 2.0
		})

		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
		geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

		return geometry
	}, [points])

	// Animation and interactivity
	useFrame((state) => {
		if (!pointsRef.current) return

		// Rotation based on mouse position
		pointsRef.current.rotation.x = mouse.y * 0.3
		pointsRef.current.rotation.y = mouse.x * 0.5

		// Subtle continuous rotation
		pointsRef.current.rotation.z += 0.001

		// No size animation - keep dots uniform
	})

	if (!dotTexture) return null

	return (
		<points ref={pointsRef}>
			<primitive object={geometry} attach="geometry" />
			<pointsMaterial
				attach="material"
				vertexColors
				size={2}
				sizeAttenuation
				transparent
				alphaTest={0.1}
				opacity={0.8}
				map={dotTexture}
			/>
		</points>
	)
}

function Scene() {
	return (
		<Canvas camera={{ position: [0, 0, 12], fov: 40 }} dpr={[1, 2]}>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} intensity={1} />
			<PointCloud />
		</Canvas>
	)
}

export default function HeroBackground() {
	const [mounted, setMounted] = useState(false)

	// Ensure the component only renders on the client
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return (
		<div className="absolute inset-0 w-full h-full -z-10 bg-transparent">
			<Scene />
		</div>
	)
}
