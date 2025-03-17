'use client'

import React, { useState, useEffect } from 'react'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { http, createConfig } from '@wagmi/core'
import { WagmiProvider } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '@rainbow-me/rainbowkit/styles.css'

// Get WalletConnect Project ID from environment variable
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'DEVELOPMENT_ID'

// Create a client - ensure it's created outside component to avoid recreation
const queryClient = new QueryClient()

// Create wagmi config outside component to avoid recreation
const config = createConfig({
	chains: [mainnet, polygon],
	transports: {
		[mainnet.id]: http(),
		[polygon.id]: http(),
	},
	ssr: true,
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
	// Using state to avoid initialization during SSR
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider
					theme={darkTheme({
						accentColor: '#8b5cf6', // Purple
						accentColorForeground: 'white',
						borderRadius: 'medium',
						overlayBlur: 'small',
					})}
				>
					{/* Only render children when mounted on client */}
					{mounted ? children : null}
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}
