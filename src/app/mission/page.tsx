import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MissionPage() {
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-serif mb-8 text-center">Our Mission</h1>

				<Card className="bg-gray-900 border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-serif">Building the Future of Gaming</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">
							At Game3 Foundation, our mission is to pioneer the next generation of gaming experiences at
							the intersection of blockchain, AI, and traditional game design.
						</p>
						<p className="text-gray-300 mb-4">
							We believe that the future of gaming lies in decentralized economies, player ownership, and
							emergent gameplay powered by cutting-edge technology. We're dedicated to building the tools,
							infrastructure, and research that will enable creators to build immersive, fair, and
							innovative game ecosystems.
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gray-900 border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-serif">Core Principles</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div>
								<h3 className="text-xl font-serif mb-2">Decentralization</h3>
								<p className="text-gray-300">
									We believe in creating gaming ecosystems that aren't controlled by single entities,
									but are owned and operated by their communities.
								</p>
							</div>

							<div>
								<h3 className="text-xl font-serif mb-2">Player Ownership</h3>
								<p className="text-gray-300">
									Players should have true ownership over their digital assets and be able to transfer
									value between different gaming experiences.
								</p>
							</div>

							<div>
								<h3 className="text-xl font-serif mb-2">Open Innovation</h3>
								<p className="text-gray-300">
									We're committed to open-source development and collaborative research that pushes
									the boundaries of what's possible in gaming.
								</p>
							</div>

							<div>
								<h3 className="text-xl font-serif mb-2">AI Integration</h3>
								<p className="text-gray-300">
									We're exploring how artificial intelligence can create more dynamic, responsive, and
									personalized gaming experiences.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
