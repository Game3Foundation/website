'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleRing() {
	const containerRef = useRef<HTMLDivElement>(null)
	const mousePosition = useRef({ x: 0, y: 0 })
	const isClicked = useRef(false)

	useEffect(() => {
		if (!containerRef.current) return

		// Setup Three.js scene
		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setPixelRatio(window.devicePixelRatio)
		containerRef.current.appendChild(renderer.domElement)

		camera.position.z = 5

		// Create particle system
		const particleCount = 50000
		const particles = new THREE.BufferGeometry()
		const positions = new Float32Array(particleCount * 3)
		const colors = new Float32Array(particleCount * 3)

		// Create a ring of particles
		for (let i = 0; i < particleCount; i++) {
			const angle = (i / particleCount) * Math.PI * 2
			const radius = 10 + Math.random() * 0.5 // Ring radius with some variation

			positions[i * 3] = Math.cos(angle) * radius // x
			positions[i * 3 + 1] = Math.sin(angle) * radius // y
			positions[i * 3 + 2] = (Math.random() - 0.5) * 100 // z with some depth

			// Add color, gradient from purple to blue
			const colorFactor = i / particleCount
			colors[i * 3] = 1 - colorFactor * 0.5 // R (purple to blue)
			colors[i * 3 + 1] = 1 + colorFactor * 0.1 // G
			colors[i * 3 + 2] = 0.1 // B
		}

		particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
		particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))

		const particleMaterial = new THREE.PointsMaterial({
			size: 0.001,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
		})

		const particleSystem = new THREE.Points(particles, particleMaterial)
		scene.add(particleSystem)

		// Event listeners for mouse interaction
		const handleMouseMove = (e: MouseEvent) => {
			// Normalize mouse position between -1 and 1
			mousePosition.current = {
				x: (e.clientX / window.innerWidth) * 2 - 1,
				y: -(e.clientY / window.innerHeight) * 2 + 1,
			}
		}

		const handleMouseDown = () => {
			isClicked.current = true
		}

		const handleMouseUp = () => {
			isClicked.current = false
		}

		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
		}

		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mousedown', handleMouseDown)
		window.addEventListener('mouseup', handleMouseUp)
		window.addEventListener('resize', handleResize)

		// Animation loop
		let frame = 0
		const animate = () => {
			requestAnimationFrame(animate)
			frame += 0.001

			// Rotate the particle system
			particleSystem.rotation.y = frame

			// Mouse interaction
			if (mousePosition.current) {
				// Tilt the ring based on mouse position
				particleSystem.rotation.x = mousePosition.current.y * 0.2
				particleSystem.rotation.z = mousePosition.current.x * 0.2

				// If clicked, create a wave effect
				// if (isClicked.current) {
				const positions = particles.attributes.position.array as Float32Array
				for (let i = 0; i < particleCount; i++) {
					const i3 = i * 3
					const angle = Math.atan2(positions[i3 + 1], positions[i3])
					const dist = Math.sqrt(positions[i3] ** 2 + positions[i3 + 1] ** 2)
					const newDist = dist + Math.sin(frame * 5 + angle * 3) * 0.1

					positions[i3] = Math.cos(angle) * newDist
					positions[i3 + 1] = Math.sin(angle) * newDist
				}
				particles.attributes.position.needsUpdate = true
				// }
			}

			renderer.render(scene, camera)
		}

		animate()

		// Cleanup
		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mousedown', handleMouseDown)
			window.removeEventListener('mouseup', handleMouseUp)
			window.removeEventListener('resize', handleResize)

			if (containerRef.current) {
				containerRef.current.removeChild(renderer.domElement)
			}

			renderer.dispose()
		}
	}, [])

	return <div ref={containerRef} className="absolute inset-0 z-0" />
}
