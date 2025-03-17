import { CardContent, CardHeader, CardTitle, CardDescription } from '@game3/components/ui/card'

export default function BattlepassPage() {
	return (
		<div className="py-12 px-4">
			<div className="max-w-4xl mx-auto">
				<CardHeader className="text-center">
					<CardTitle className="text-4xl font-medium mb-4">Battlepass</CardTitle>
					<CardDescription className="text-xl text-gray-400 max-w-3xl mx-auto">
						A cross-game progression and rewards system that allows players to earn and utilize digital
						assets across different gaming ecosystems.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<div className="space-y-8 mt-8">
						<div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
							<h3 className="text-xl font-medium mb-2">Cross-Game Progression</h3>
							<p className="text-gray-300">
								Battlepass allows players to earn experience and progress through levels across multiple
								games. Your achievements in one game contribute to your overall Battlepass level,
								creating a unified progression system that spans your entire gaming experience.
							</p>
						</div>

						<div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
							<h3 className="text-xl font-medium mb-2">Universal Rewards</h3>
							<p className="text-gray-300">
								As you progress through Battlepass levels, you'll earn rewards that can be used across
								all participating games. These rewards include cosmetics, in-game currency, and special
								items that maintain their value and utility regardless of which game you're playing.
							</p>
						</div>

						<div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
							<h3 className="text-xl font-medium mb-2">Developer Integration</h3>
							<p className="text-gray-300">
								Game developers can easily integrate Battlepass into their games using our SDK. This
								allows them to tap into a growing ecosystem of players and offer unique rewards that can
								be used across multiple games, increasing player engagement and retention.
							</p>
						</div>

						<div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
							<h3 className="text-xl font-medium mb-2">Web3 Infrastructure</h3>
							<p className="text-gray-300">
								Built on blockchain technology, Battlepass ensures true ownership of rewards and
								progression. Players' achievements and items are securely stored on the blockchain,
								making them portable, tradable, and truly owned by the players themselves.
							</p>
						</div>
					</div>

					<div className="mt-12 text-center">
						<p className="text-gray-400">
							Battlepass is currently in closed beta with select partner games. Sign up for our newsletter
							to be notified when we open access to more games and players.
						</p>
					</div>
				</CardContent>
			</div>
		</div>
	)
}
