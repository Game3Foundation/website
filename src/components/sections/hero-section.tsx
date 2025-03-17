'use client'

import { useState } from 'react'
import { Button } from '@game3/components/ui/button'
import { Input } from '@game3/components/ui/input'

export default function HeroSection() {
	const [prompt, setPrompt] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [response, setResponse] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!prompt.trim()) return

		setIsSubmitting(true)

		// Mock interaction with Game3 model
		await new Promise((resolve) => setTimeout(resolve, 1500))

		// Simulate response from the model
		setResponse(
			"The Game3 model is analyzing complex systems in gaming ecosystems. Your query about the intersection of AI, blockchain and generative worlds is fascinating. We're building tools to enable more immersive and decentralized experiences for the next generation of players.",
		)

		setIsSubmitting(false)
	}

	return (
		<section className="relative bg-black text-white min-h-screen flex items-center">
			<div className="absolute inset-0 z-0">
				<div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 mix-blend-multiply" />
				<div className="absolute inset-0 bg-black/50" />
			</div>

			<div className="container mx-auto px-4 z-10">
				<div className="max-w-3xl mx-auto text-center">
					<h1 className="text-6xl font-medium mb-4 ">Game3 Foundation</h1>
					<p className="text-xl mb-8">Advancing research and development for the video game industry.</p>

					{/* <div className="max-w-xl mx-auto">
            <div className="mb-2 text-left">
              <h3 className="text-lg font-normal text-gray-300">Interact with the Game3 model:</h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mx-auto">
              <Input
                type="text"
                placeholder="Ask something about gaming, AI, web3, or our research..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isSubmitting}
                className="flex-grow bg-black/50 border-purple-700 text-white placeholder-gray-400 p-3 h-auto"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                {isSubmitting ? "Processing..." : "Submit"}
              </Button>
            </form>

            {response && (
              <div className="mt-6 p-4 bg-gray-900/80 rounded-lg border border-purple-900/50 text-left">
                <p className="text-gray-300">{response}</p>
              </div>
            )}
          </div> */}
				</div>
			</div>
		</section>
	)
}
