'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useConnectModal, useAccountModal } from '@rainbow-me/rainbowkit'
import { Button } from '@game3/components/ui/button'
import { SparkleButton } from '@game3/components/ui/sparkle-button'

export default function WalletButton() {
	// Always call all hooks at the top level, regardless of mounting state
	// This ensures the number of hooks is consistent between renders
	const { address, isConnected } = useAccount()
	const { openConnectModal } = useConnectModal() || {}
	const { openAccountModal } = useAccountModal() || {}
	const [mounted, setMounted] = useState(false)

	// Format address helper function
	const formatAddress = (address?: string) => {
		if (!address) return ''
		return `${address.slice(0, 6)}...${address.slice(-4)}`
	}

	useEffect(() => {
		setMounted(true)
	}, [])

	// During initial render or SSR, show a placeholder button
	// but still call all the hooks above
	if (!mounted) {
		return (
			<Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled>
				Connect Wallet
			</Button>
		)
	}

	// Connected state - only use values from hooks after mounted check
	if (isConnected && address) {
		return (
			<>
				<SparkleButton
					href="/grants/apply"
					className="bg-primary hover:bg-primary/90 text-primary-foreground font-light"
				>
					Apply for a Grant
				</SparkleButton>
				<Button
					variant="outline"
					className="border-gray-700 text-gray-300 font-light"
					onClick={openAccountModal}
				>
					{formatAddress(address)}
				</Button>
			</>
		)
	}

	// Not connected state
	return (
		<Button
			onClick={openConnectModal}
			variant="default"
			className="bg-primary hover:bg-primary/90 text-primary-foreground font-light"
		>
			Connect Wallet
		</Button>
	)
}
