import React from 'react'
import { Card } from '@game3/components/ui/card'

export default function InitiativesLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-black text-white">
			<div className="pt-8 pb-12 md:pt-12 md:pb-16">
				<div className="container px-4 mx-auto">
					<Card className="bg-black border-gray-800 text-white">{children}</Card>
				</div>
			</div>
		</div>
	)
}
