import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-medium mb-8 text-center">About Game3 Foundation</h1>

				<Card className="bg-black border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-medium">Our Mission</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">
							Game3 Foundation is dedicated to advancing the intersection of gaming, blockchain
							technology, and AI. We support research and development that pushes the boundaries of what's
							possible in gaming.
						</p>
						<p className="text-gray-300">
							Our mission is to enable a new generation of game creators and players to build and
							experience immersive worlds that are more open, fair, and innovative.
						</p>
					</CardContent>
				</Card>

				<Card className="bg-black border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-medium">Our Vision</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300">
							We envision a future where games transcend their traditional boundaries, becoming complex
							ecosystems that blend AI-driven experiences with decentralized economies. By combining
							cutting-edge technology with thoughtful game design, we're working to create experiences
							that are not just entertaining, but transformative.
						</p>
					</CardContent>
				</Card>

				<Card className="bg-black border-gray-800 text-white">
					<CardHeader>
						<CardTitle className="font-medium">Our Team</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">
							Game3 Foundation brings together experts from diverse backgrounds including game
							development, blockchain engineering, AI research, and systems design. Our interdisciplinary
							approach allows us to tackle complex challenges and discover innovative solutions.
						</p>
						<p className="text-gray-300">
							We're a global team united by our passion for creating the future of gaming.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
