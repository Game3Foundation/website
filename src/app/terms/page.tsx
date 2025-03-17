import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-serif mb-8 text-center">Terms of Service</h1>

				<Card className="bg-gray-900 border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-serif">1. Agreement to Terms</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300">
							By accessing or using the Game3 Foundation website, you agree to be bound by these Terms of
							Service and all applicable laws and regulations. If you do not agree with any of these
							terms, you are prohibited from using or accessing this site.
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gray-900 border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-serif">2. Use License</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">
							Permission is granted to temporarily access the materials on Game3 Foundation's website for
							personal, non-commercial transitory viewing only. This is the grant of a license, not a
							transfer of title, and under this license you may not:
						</p>
						<ul className="list-disc pl-5 text-gray-300">
							<li>Modify or copy the materials</li>
							<li>Use the materials for any commercial purpose or for any public display</li>
							<li>Attempt to reverse engineer any software contained on Game3 Foundation's website</li>
							<li>Remove any copyright or other proprietary notations from the materials</li>
							<li>
								Transfer the materials to another person or "mirror" the materials on any other server
							</li>
						</ul>
					</CardContent>
				</Card>

				<Card className="bg-gray-900 border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-serif">3. Disclaimer</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300">
							The materials on Game3 Foundation's website are provided on an 'as is' basis. Game3
							Foundation makes no warranties, expressed or implied, and hereby disclaims and negates all
							other warranties including, without limitation, implied warranties or conditions of
							merchantability, fitness for a particular purpose, or non-infringement of intellectual
							property or other violation of rights.
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gray-900 border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-serif">4. Limitations</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300">
							In no event shall Game3 Foundation or its suppliers be liable for any damages (including,
							without limitation, damages for loss of data or profit, or due to business interruption)
							arising out of the use or inability to use the materials on Game3 Foundation's website, even
							if Game3 Foundation or a Game3 Foundation authorized representative has been notified orally
							or in writing of the possibility of such damage.
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gray-900 border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-serif">5. Revisions and Errata</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300">
							The materials appearing on Game3 Foundation's website could include technical,
							typographical, or photographic errors. Game3 Foundation does not warrant that any of the
							materials on its website are accurate, complete or current. Game3 Foundation may make
							changes to the materials contained on its website at any time without notice.
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gray-900 border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-serif">6. Governing Law</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300">
							These terms and conditions are governed by and construed in accordance with the laws and you
							irrevocably submit to the exclusive jurisdiction of the courts in that location.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
