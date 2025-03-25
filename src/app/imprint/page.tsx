import { Card, CardContent, CardHeader, CardTitle } from '@game3/components/ui/card'

export default function ImprintPage() {
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-medium mb-8 text-center">Imprint</h1>

				<Card className="bg-black border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-medium">Company Information</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">
							Game3 Foundation
							<br />
							Werdenbergerweg 11
							<br />
							9490 Vaduz
							<br />
							Liechtenstein
						</p>
						<p className="text-gray-300">
							<strong>Email:</strong> legal@game3.foundation
						</p>
					</CardContent>
				</Card>

				<Card className="bg-black border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-medium">Regulatory Information</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">
							Registered as a non-profit organization in Vaduz, Liechtenstein
							<br />
							Registration Number: FL-0002.688.080-3
						</p>
						<p className="text-gray-300">
							Regulatory Authority: <br />
							Foundation Supervisory Authority
							<br />
							Giessenstrasse 3, P.O. Box 684, LI-9490 Vaduz
							<br />
							T. +423 236 62 00, info.stifa.aju@llv.li
						</p>
					</CardContent>
				</Card>

				<Card className="bg-black border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-medium">Responsible for Content</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300">
							Content Manager: Alex Johnson
							<br />
							Email: content@game3.foundation
							<br />
							<br />
							The contents of this website were created with utmost care. However, Game3 Foundation cannot
							guarantee the accuracy, completeness, or quality of the information provided. Game3
							Foundation is not liable for the content of external links.
						</p>
					</CardContent>
				</Card>

				<div className="text-center text-gray-400 mt-8">
					<p>Last updated: {new Date().toLocaleDateString()}</p>
				</div>
			</div>
		</div>
	)
}
