import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@game3/components/ui/card'
import { Button } from '@game3/components/ui/button'

export default function ApplicationSuccessPage() {
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-3xl mx-auto">
				<Card className="bg-gray-900 border-gray-800 text-white mb-8">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-6">
							<div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									className="w-8 h-8 text-white"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
						</div>
						<CardTitle className="font-medium text-3xl">Application Submitted Successfully!</CardTitle>
					</CardHeader>
					<CardContent className="text-center">
						<p className="text-gray-300 mb-6">
							Thank you for applying to the Game3 Foundation Grants Program. We've received your
							application and will review it carefully.
						</p>
						<p className="text-gray-300 mb-10">
							Our team will get back to you within 4-6 weeks regarding the status of your application. In
							the meantime, feel free to explore our resources or connect with our community.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/grants" passHref>
								<Button
									variant="outline"
									className="bg-transparent text-white border-gray-600 hover:bg-gray-800"
								>
									Back to Grants
								</Button>
							</Link>
							<Link href="/" passHref>
								<Button className="bg-orange-500 hover:bg-orange-600">Home</Button>
							</Link>
						</div>
					</CardContent>
				</Card>

				<div className="text-center text-gray-400">
					<p>Reference ID: {Math.random().toString(36).substring(2, 15)}</p>
					<p className="mt-2">If you have any questions, please contact us at grants@game3.foundation</p>
				</div>
			</div>
		</div>
	)
}
