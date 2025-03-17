import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function GenerativeModelsPage() {
	return (
		<div className="py-12 px-4">
			<div className="max-w-4xl mx-auto">
				<CardHeader className="text-center">
					<CardTitle className="text-4xl font-serif mb-4">Generative Models</CardTitle>
					<CardDescription className="text-xl text-gray-400 max-w-3xl mx-auto">
						Advanced AI systems that create immersive worlds, mechanics, and narrative structures powered by
						machine learning.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<div className="space-y-8 mt-8">
						<div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
							<h3 className="text-xl font-serif mb-2">Procedural Generation</h3>
							<p className="text-gray-300">
								We're developing AI models that can procedurally generate game worlds, levels,
								characters, and narratives based on a set of parameters and constraints. This allows for
								infinite variety and replayability in games, while maintaining coherence and quality.
							</p>
						</div>

						<div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
							<h3 className="text-xl font-serif mb-2">Content Creation Tools</h3>
							<p className="text-gray-300">
								Our tools help game developers and designers create high-quality content more
								efficiently. By automating repetitive tasks and assisting with creative processes, we
								enable smaller teams to build larger, more ambitious games.
							</p>
						</div>

						<div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
							<h3 className="text-xl font-serif mb-2">Dynamic Storytelling</h3>
							<p className="text-gray-300">
								Our narrative generation systems create personalized storylines that adapt to player
								choices and behaviors. This creates truly emergent storytelling that responds to each
								player's unique journey through the game world.
							</p>
						</div>

						<div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
							<h3 className="text-xl font-serif mb-2">Unity3D Integration</h3>
							<p className="text-gray-300">
								We've developed plugins for the Unity3D game engine that make it easy for developers to
								integrate our generative models into their existing workflows. These tools are designed
								to be intuitive and accessible to developers of all skill levels.
							</p>
						</div>
					</div>

					<div className="mt-12 text-center">
						<p className="text-gray-400">
							Interested in using our generative models in your game? Contact us to learn about our early
							access program and developer resources.
						</p>
					</div>
				</CardContent>
			</div>
		</div>
	)
}
