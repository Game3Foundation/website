'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@game3/lib/utils'

interface SparkleProps {
	id: number
	x: number
	y: number
	size: number
	color: string
}

interface SparkleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	href?: string
	className?: string
	children: React.ReactNode
}

export const SparkleButton = ({ href, className, children, ...props }: SparkleButtonProps) => {
	const router = useRouter()
	const buttonRef = useRef<HTMLButtonElement>(null)
	const [isHovering, setIsHovering] = useState(false)
	const [isClicking, setIsClicking] = useState(false)
	const [sparkles, setSparkles] = useState<SparkleProps[]>([])

	const getRandomColor = () => {
		const colors = ['#FF9800', '#F57C00', '#FB8C00', '#FF9800', '#FFA726', '#FFB74D']
		return colors[Math.floor(Math.random() * colors.length)]
	}

	// Generate sparkles when hovering
	useEffect(() => {
		if (!isHovering) return

		const interval = setInterval(
			() => {
				if (buttonRef.current) {
					const buttonRect = buttonRef.current.getBoundingClientRect()
					const sparkle = {
						id: Date.now() + Math.random(),
						x: Math.random() * buttonRect.width,
						y: Math.random() * buttonRect.height,
						size: Math.random() * 10 + (isClicking ? 4 : 2), // Larger sparkles when clicking
						color: getRandomColor(),
					}

					setSparkles((prev) => [...prev, sparkle])

					// Remove sparkle after animation
					setTimeout(() => {
						setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id))
					}, 700)
				}
			},
			isClicking ? 20 : 80,
		) // Generate more sparkles when clicking

		return () => clearInterval(interval)
	}, [isHovering, isClicking])

	const handleClick = () => {
		setIsClicking(true)

		// Create a burst of sparkles on click
		if (buttonRef.current) {
			const buttonRect = buttonRef.current.getBoundingClientRect()
			const newSparkles = Array.from({ length: 20 }, (_, i) => ({
				id: Date.now() + i,
				x: Math.random() * buttonRect.width,
				y: Math.random() * buttonRect.height,
				size: Math.random() * 15 + 5,
				color: getRandomColor(),
			}))

			setSparkles((prev) => [...prev, ...newSparkles])
		}

		// Navigate after a small delay to show the sparkle effect
		if (href) {
			setTimeout(() => {
				router.push(href)
			}, 300)
		}

		// Reset clicking state
		setTimeout(() => {
			setIsClicking(false)
		}, 500)
	}

	return (
		<button
			ref={buttonRef}
			className={cn(
				'relative overflow-hidden rounded-md font-medium transition-all',
				// isClicking ? 'transform scale-95' : '',
				className,
			)}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => {
				setIsHovering(false)
				setSparkles([])
			}}
			onClick={handleClick}
			{...props}
		>
			<span className="relative z-10">{children}</span>

			{/* Sparkles container */}
			<div className="absolute inset-0 pointer-events-none">
				{sparkles.map((sparkle) => (
					<div
						key={sparkle.id}
						className="absolute animate-sparkle-float"
						style={{
							width: `${sparkle.size}px`,
							height: `${sparkle.size}px`,
							left: `${sparkle.x}px`,
							top: `${sparkle.y}px`,
							background: sparkle.color,
							borderRadius: '50%',
							boxShadow: `0 0 ${sparkle.size * 0.5}px ${sparkle.color}`,
							opacity: 0,
							animation: `sparkle-float 500ms ease-out forwards`,
						}}
					/>
				))}
			</div>
		</button>
	)
}
