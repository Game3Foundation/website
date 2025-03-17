import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@game3/components/ui/card'
import { Button } from '@game3/components/ui/button'
import Link from 'next/link'

const portfolioItems = [
	{
		title: 'Research',
		description:
			'Cutting-edge research into blockchain gaming, decentralized infrastructure, and new gaming paradigms enabled by web3 technologies.',
		imageUrl: '/images/research.jpg',
		link: '/initiatives/research',
	},
	{
		title: 'Zero Network',
		description:
			'A specialized layer-1 blockchain optimized for gaming applications with high throughput, low latency, and composable gaming assets.',
		imageUrl: '/images/zero-network.jpg',
		link: 'https://zero.io',
	},

	{
		title: 'GameDAO',
		description:
			'Decentralized governance and funding platform for gaming communities. Enabling creators and players to collaboratively build and shape the future of gaming.',
		imageUrl: '/images/gamedao.jpg',
		link: 'https://gamedao.co',
	},
	{
		title: 'Battlepass',
		description:
			'A cross-game progression and rewards system that allows players to earn and utilize digital assets across different gaming ecosystems.',
		imageUrl: '/images/battlepass.jpg',
		link: '/initiatives/battlepass',
	},
	{
		title: 'Generators',
		description:
			'Advanced AI models for procedural game and content generation. Create immersive worlds, mechanics, and narrative structures powered by machine learning.',
		imageUrl: '/images/game3-generators.jpg',
		link: '/initiatives/generative-models',
	},
	{
		title: 'Agents',
		description:
			'Frameworks for implementing autonomous agents in games, enabling NPC behaviors with genuine emergent intelligence and dynamic responses to player actions.',
		imageUrl: '/images/game3-agents.jpg',
		link: '/initiatives/agentic-systems',
	},
]

export default function PortfolioSection() {
	return (
		<section className="py-24 bg-black">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-medium mb-4 text-white">Our Initiatives</h2>
					<p className="text-xl text-gray-400 max-w-3xl mx-auto">
						Explore research and projects we are developing to transform the gaming industry through Web3
						and AI.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{portfolioItems.map((item, index) => (
						<Card
							key={index}
							className="bg-black border-gray-800 text-white overflow-hidden hover:border-orange-500 transition-all duration-300"
						>
							<div className="h-48 bg-black relative">
								<div className="absolute inset-0 flex items-center justify-center bg-orange-900/50">
									<span className="text-2xl font-medium">{item.title}</span>
								</div>
							</div>
							<CardHeader>
								<CardTitle className="font-medium">{item.title}</CardTitle>
								<CardDescription className="text-gray-400">{item.description}</CardDescription>
							</CardHeader>
							<CardFooter>
								<Link href={item.link} passHref>
									<Button className="bg-orange-500 hover:bg-orange-600 text-white">Learn More</Button>
								</Link>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
