import { CardContent, CardHeader, CardTitle, CardDescription } from '@game3/components/ui/card'

export default function AgenticSystemsPage() {
	return (
		<div className="py-12 px-4">
			<div className="max-w-4xl mx-auto">
				<CardHeader className="text-center">
					<CardTitle className="text-4xl font-serif mb-4">Agentic Systems</CardTitle>
					<CardDescription className="text-xl text-gray-400 max-w-3xl mx-auto">
						Framework for implementing autonomous agents in games, enabling NPC behaviors with genuine
						emergent intelligence.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<div className="space-y-8 mt-8">
						<div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
							<h3 className="text-xl font-serif mb-2">Autonomous NPCs</h3>
							<p className="text-gray-300">
								Our agentic systems framework allows non-player characters to operate with genuine
								autonomy, making decisions based on their own goals, knowledge, and perceptions. This
								creates NPCs that feel alive and respond organically to player actions.
							</p>
						</div>

						<div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
							<h3 className="text-xl font-serif mb-2">Emergent Behaviors</h3>
							<p className="text-gray-300">
								By giving agents simple rules and objectives rather than scripted behaviors, complex and
								unexpected interactions emerge naturally. This leads to game worlds that surprise even
								their creators, creating unique experiences for each player.
							</p>
						</div>

						<div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
							<h3 className="text-xl font-serif mb-2">Memory and Learning</h3>
							<p className="text-gray-300">
								Our agents can remember past interactions and learn from them, allowing NPCs to develop
								relationships with players over time. They'll remember how you've treated them and
								adjust their behavior accordingly, creating meaningful relationships.
							</p>
						</div>

						<div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
							<h3 className="text-xl font-serif mb-2">Decentralized Intelligence</h3>
							<p className="text-gray-300">
								By running portions of agent intelligence on blockchain infrastructure, we enable
								persistent NPCs that can exist across multiple games and environments. These agents can
								even operate when the player isn't present, continuing their virtual lives
								independently.
							</p>
						</div>
					</div>

					<div className="mt-12 text-center">
						<p className="text-gray-400">
							We're currently working with select game developers to implement our agentic systems in
							their projects. If you're interested in being among the first to use this technology, please
							reach out via our contact page.
						</p>
					</div>
				</CardContent>
			</div>
		</div>
	)
}
