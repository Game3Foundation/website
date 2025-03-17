import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-serif mb-8 text-center">Privacy Policy</h1>

				<Card className="bg-gray-900 border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-serif">Introduction</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">
							Game3 Foundation ("we", "our", or "us") is committed to protecting your privacy. This
							Privacy Policy explains how we collect, use, disclose, and safeguard your information when
							you visit our website or use our services.
						</p>
						<p className="text-gray-300">
							We reserve the right to make changes to this Privacy Policy at any time and for any reason.
							We will alert you about any changes by updating the "Last updated" date of this Privacy
							Policy.
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gray-900 border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-serif">Information We Collect</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">
							<strong>Personal Data:</strong> While using our Service, we may ask you to provide us with
							certain personally identifiable information that can be used to contact or identify you
							("Personal Data"). Personally identifiable information may include, but is not limited to:
						</p>
						<ul className="list-disc pl-5 text-gray-300 mb-4">
							<li>Email address</li>
							<li>First name and last name</li>
							<li>Cryptocurrency wallet addresses</li>
							<li>Usage Data</li>
						</ul>
						<p className="text-gray-300">
							<strong>Usage Data:</strong> We may also collect information about how the Service is
							accessed and used ("Usage Data"). This Usage Data may include information such as your
							computer's Internet Protocol address (e.g., IP address), browser type, browser version, the
							pages of our Service that you visit, the time and date of your visit, the time spent on
							those pages, unique device identifiers, and other diagnostic data.
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gray-900 border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-serif">Use of Data</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">
							Game3 Foundation uses the collected data for various purposes:
						</p>
						<ul className="list-disc pl-5 text-gray-300">
							<li>To provide and maintain our Service</li>
							<li>To notify you about changes to our Service</li>
							<li>
								To allow you to participate in interactive features of our Service when you choose to do
								so
							</li>
							<li>To provide customer support</li>
							<li>To gather analysis or valuable information so that we can improve our Service</li>
							<li>To monitor the usage of our Service</li>
							<li>To detect, prevent and address technical issues</li>
						</ul>
					</CardContent>
				</Card>

				<Card className="bg-gray-900 border-gray-800 text-white mb-8">
					<CardHeader>
						<CardTitle className="font-serif">Contact Us</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300">
							If you have any questions about this Privacy Policy, please contact us at
							privacy@game3.foundation
						</p>
					</CardContent>
				</Card>

				<div className="text-center text-gray-400">
					<p>Last updated: {new Date().toLocaleDateString()}</p>
				</div>
			</div>
		</div>
	)
}
