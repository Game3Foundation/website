'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function NoiseShader() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const { theme } = useTheme()
	const [scrollY, setScrollY] = useState(0)

	// Track particle state
	const particlesRef = useRef<
		{
			x: number
			y: number
			size: number
			speed: number
			opacity: number
			direction: number
		}[]
	>([])

	// Keep references to animation frame and context
	const requestRef = useRef<number>()
	const contextRef = useRef<CanvasRenderingContext2D | null>(null)

	// Handle scroll events
	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Initialize and animate particles
	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		// Create context only once
		if (!contextRef.current) {
			contextRef.current = canvas.getContext('2d')
		}
		const ctx = contextRef.current
		if (!ctx) return

		// Set canvas dimensions
		const updateCanvasSize = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight

			// Initialize particles if not already done
			if (particlesRef.current.length === 0) {
				const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000)
				particlesRef.current = Array.from({ length: particleCount }, () => ({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					size: Math.random() * 1 + 1,
					speed: Math.random() * 1 + 0.5,
					opacity: Math.random() * 0.5 + 0.1,
					direction: Math.random() > 0.5 ? 1 : -1,
				}))
			}
		}

		// Update canvas size on resize
		window.addEventListener('resize', updateCanvasSize)
		updateCanvasSize()

		// Animation function
		const animate = () => {
			if (!ctx || !canvas) return

			// Get current particle color based on theme
			const particleColor = theme === 'dark' ? '255, 255, 0' : '0, 0, 0'

			// Clear the canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			// Update and draw particles
			particlesRef.current.forEach((particle, i) => {
				// Update position based on scroll
				const scrollFactor = scrollY * 0.05
				particle.y += (particle.speed + scrollFactor * 0.01) * particle.direction

				// Add some horizontal movement based on scroll
				particle.x += Math.sin(scrollY * 0.001 + i) * 0.5

				// Reset if out of bounds
				if (particle.y > canvas.height) {
					particle.y = 0
				} else if (particle.y < 0) {
					particle.y = canvas.height
				}

				if (particle.x > canvas.width) {
					particle.x = 0
				} else if (particle.x < 0) {
					particle.x = canvas.width
				}

				// Draw particle
				ctx.beginPath()
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
				ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity * (1 + scrollFactor * 0.01)})`
				ctx.fill()
			})

			// Continue animation loop
			requestRef.current = requestAnimationFrame(animate)
		}

		// Start animation
		requestRef.current = requestAnimationFrame(animate)

		// Cleanup
		return () => {
			if (requestRef.current) {
				cancelAnimationFrame(requestRef.current)
			}
			window.removeEventListener('resize', updateCanvasSize)
		}
	}, [theme, scrollY])

	return (
		<canvas
			ref={canvasRef}
			className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0 opacity-30 mix-blend-hard-light"
		/>
	)
}
