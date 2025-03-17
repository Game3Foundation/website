'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { useAccount } from 'wagmi'
import { useConnectModal, useAccountModal } from '@rainbow-me/rainbowkit'

import { Button } from '@game3/components/ui/button'
import { SparkleButton } from '@game3/components/ui/sparkle-button'

export default function Header() {
	const [mounted, setMounted] = useState(false)

	// Only use hooks when mounted to avoid SSR issues
	const { openConnectModal } = useConnectModal() || {}
	const { openAccountModal } = useAccountModal() || {}
	const { address, isConnected } = useAccount() || { address: undefined, isConnected: false }

	useEffect(() => {
		setMounted(true)
	}, [])

	// Format address for display (e.g., 0x1234...5678)
	const formatAddress = (address?: string) => {
		if (!address) return ''
		return `${address.slice(0, 6)}...${address.slice(-4)}`
	}

	// Don't render anything meaningful during SSR or before mounting
	if (!mounted) {
		return (
			<header className="fixed w-full top-0 z-50 bg-background border-b border-border">
				<div className="container mx-auto flex justify-between items-center h-16 px-4">
					<div className="flex items-center">
						<Link href="/" className="font-medium text-md hover:opacity-80">
							Game3 Foundation
						</Link>
					</div>
					<div className="hidden md:flex items-center space-x-6">
						{/* Placeholder for wallet button */}
						<div className="w-32 h-10"></div>
					</div>
				</div>
			</header>
		)
	}

	return (
		<header className="fixed w-full top-0 z-50 bg-background border-b border-border">
			<div className="container mx-auto flex justify-between items-center h-16 px-4">
				<div className="flex items-center">
					{/* Logo/Site name */}
					<Link href="/" className="font-medium text-md hover:opacity-80">
						Game3 Foundation
					</Link>
				</div>

				{/* Navigation for desktop */}
				<nav className="hidden md:flex items-center space-x-6">
					{isConnected && <SparkleButton href="/grants/apply">Apply for a Grant</SparkleButton>}

					{isConnected ? (
						<Button variant="outline" className="border-gray-700 text-gray-300" onClick={openAccountModal}>
							{formatAddress(address)}
						</Button>
					) : (
						<Button
							onClick={openConnectModal}
							variant="default"
							className="bg-orange-500 hover:bg-orange-600 text-white"
						>
							Connect Wallet
						</Button>
					)}
				</nav>

				{/* Mobile menu button */}
				<div className="md:hidden flex items-center space-x-4">
					{isConnected ? (
						<Button variant="ghost" size="sm" className="text-gray-300" onClick={openAccountModal}>
							{formatAddress(address)}
						</Button>
					) : (
						<Button
							variant="ghost"
							className="text-foreground hover:bg-accent hover:text-accent-foreground"
							onClick={openConnectModal}
						>
							Connect
						</Button>
					)}
				</div>
			</div>
		</header>
	)
}
