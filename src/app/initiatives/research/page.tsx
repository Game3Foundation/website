import { CardContent, CardHeader, CardTitle, CardDescription } from '@game3/components/ui/card'

export default function ResearchPage() {
	const researchAreas = [
		{
			title: 'Blockchain Gaming Infrastructure',
			description:
				'Developing optimized layer-1 and layer-2 solutions specifically designed for gaming applications, focusing on high throughput, low latency, and seamless user experience.',
		},
		{
			title: 'AI-Driven Game Generation',
			description:
				'Creating advanced models that can procedurally generate game worlds, mechanics, and narratives based on player preferences and behaviors.',
		},
		{
			title: 'Autonomous Game Agents',
			description:
				'Researching and implementing agentic systems that enable NPCs with emergent intelligence, capable of adapting to player actions and evolving over time.',
		},
		{
			title: 'Decentralized Game Economies',
			description:
				'Exploring economic models that enable fair, transparent, and sustainable in-game economies powered by blockchain technology.',
		},
		{
			title: 'Cross-Game Identity and Assets',
			description:
				'Investigating solutions for portable digital identities and assets that can move seamlessly between different games and virtual environments.',
		},
	]

	return (
		<div className="py-12 px-4">
			<div className="max-w-4xl mx-auto">
				<CardHeader className="text-center">
					<CardTitle className="text-4xl font-medium mb-4">Research Initiatives</CardTitle>
					<CardDescription className="text-xl text-gray-400 max-w-3xl mx-auto">
						Exploring the cutting edge of gaming technology and design to build the foundation for the next
						generation of interactive experiences.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<div className="space-y-8 mt-8">
						{researchAreas.map((area, index) => (
							<div key={index} className="bg-black/50 p-6 rounded-lg border border-gray-800">
								<h3 className="text-xl font-medium mb-2">{area.title}</h3>
								<p className="text-gray-300">{area.description}</p>
							</div>
						))}
					</div>

					<div className="mt-12 text-center">
						<p className="text-gray-400">
							Our research is open and collaborative. If you're interested in contributing or learning
							more about our ongoing projects, please reach out via our{' '}
							<a href="/contact" className="text-orange-400 hover:text-orange-300">
								contact page
							</a>
							.
						</p>
					</div>
				</CardContent>
			</div>
		</div>
	)
}
