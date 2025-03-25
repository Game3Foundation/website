'use client'

import Link from 'next/link'
import { Button } from '@game3/components/ui/button'
import dynamic from 'next/dynamic'

// Import wallet button with no SSR to avoid hydration issues
const WalletButton = dynamic(() => import('@game3/components/wallet/wallet-button'), {
	ssr: false,
	loading: () => (
		<Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled>
			Connect Wallet
		</Button>
	),
})

export default function Header() {
	return (
		<header className="fixed w-full top-0 z-50 bg-background border-b border-border">
			<div className="container mx-auto flex justify-between items-center h-16 px-4">
				<div className="flex items-center">
					<Link href="/" className="font-medium text-md hover:opacity-80">
						Game3 Foundation
					</Link>
				</div>

				<nav className="hidden md:flex items-center space-x-6">
					<WalletButton />
				</nav>

				<div className="md:hidden flex items-center space-x-4">
					<WalletButton />
				</div>
			</div>
		</header>
	)
}
