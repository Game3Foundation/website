'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@game3/components/ui/button'
import dynamic from 'next/dynamic'

// Dynamically import the HeroBackground with no SSR
// const HeroBackground = dynamic(() => import('./HeroBackground'), { ssr: false })

export default function HeroSection() {
	const [isMounted, setIsMounted] = useState(false)

	// Avoid hydration mismatch by only rendering motion elements on client
	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<section className="relative min-h-screen flex items-center overflow-hidden">
			{/* {isMounted && <HeroBackground />} */}

			{/* Content that will appear on top of the 3D background */}
			<div className="container mx-auto px-4 z-10 relative">
				<div className="max-w-3xl mx-auto text-center">
					{isMounted ? (
						<>
							<motion.h1
								className="text-5xl md:text-7xl font-medium mb-6"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
							>
								<span className="text-orange-500 font-bold">Game3 Foundation</span>
							</motion.h1>

							<motion.p
								className="text-xl md:text-2xl text-gray-300 mb-10"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								Advancing research and development for video game creators.
							</motion.p>

							<motion.div
								className="flex flex-col sm:flex-row gap-4 justify-center"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.4 }}
							>
								{/* ...existing buttons... */}
							</motion.div>
						</>
					) : (
						// Static version for server rendering
						<>
							<h1 className="text-5xl md:text-7xl font-medium mb-6">
								<span className="text-orange-500 font-bold">Game3 Foundation</span>
							</h1>
							<p className="text-xl md:text-2xl text-gray-300 mb-10">
								Advancing research and development for video game creators.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								{/* ...existing buttons without motion... */}
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	)
}
