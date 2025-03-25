import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@game3/components/ui/card'
import { SparkleButton } from '@game3/components/ui/sparkle-button'

export default function GrantsPage() {
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-medium mb-4 text-center">Game3 Grants Program</h1>
				<p className="text-xl text-gray-400 max-w-3xl mx-auto text-center mb-12">
					Supporting innovative projects at the intersection of gaming, blockchain, and AI.
				</p>

				<div className="text-center mb-12">
					<SparkleButton
						href="/grants/apply"
						className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4"
					>
						Apply for Grant
					</SparkleButton>
				</div>

				<Card className="bg-black border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-medium">About the Program</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">
							The Game3 Grants Program aims to accelerate innovation in the gaming industry by supporting
							pioneering projects that leverage web3 technologies and AI. We provide financial support,
							mentorship, and resources to help bring revolutionary gaming ideas to life.
						</p>
						<p className="text-gray-300">
							Our grants range from $5,000 to $50,000 depending on the project scope, complexity, and
							potential impact.
						</p>
					</CardContent>
				</Card>

				<Card className="bg-black border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-medium">What We Fund</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">
							We're particularly interested in projects working in the following areas:
						</p>
						<ul className="list-disc pl-5 text-gray-300">
							<li>Blockchain gaming infrastructure</li>
							<li>AI-powered game content generation</li>
							<li>Decentralized virtual economies</li>
							<li>Autonomous game agents and NPCs</li>
							<li>Cross-game identity and asset frameworks</li>
							<li>Novel game mechanics enabled by web3</li>
							<li>Open-source gaming tools and middleware</li>
						</ul>
					</CardContent>
				</Card>

				<Card className="bg-black border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-medium">Selection Criteria</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">Applications are evaluated based on:</p>
						<ul className="list-disc pl-5 text-gray-300">
							<li>Innovation and originality</li>
							<li>Technical feasibility</li>
							<li>Team experience and capabilities</li>
							<li>Market potential and scalability</li>
							<li>Alignment with Game3 Foundation's mission</li>
							<li>Commitment to open-source and community</li>
						</ul>
					</CardContent>
				</Card>

				<Card className="bg-black border-gray-800 text-white">
					<CardHeader>
						<CardTitle className="font-medium">Timeline</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">
							The Game3 Grants Program accepts applications on a rolling basis. The review process
							typically takes 4-6 weeks.
						</p>
						<p className="text-gray-300">
							Ready to apply? Click the button above to submit your application. If you have questions,
							please contact us at grants@game3.foundation.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
