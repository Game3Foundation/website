'use client'

import React from 'react'
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

import '@rainbow-me/rainbowkit/styles.css'

// Get WalletConnect Project ID from environment variable
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'DEVELOPMENT_ID'

const { chains, publicClient } = configureChains([mainnet, polygon], [publicProvider()])

const { connectors } = getDefaultWallets({
	appName: 'Game3 Foundation',
	projectId,
	chains,
})

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider
				chains={chains}
				theme={darkTheme({
					accentColor: '#8b5cf6', // Purple
					accentColorForeground: 'white',
					borderRadius: 'medium',
					overlayBlur: 'small',
				})}
			>
				{children}
			</RainbowKitProvider>
		</WagmiConfig>
	)
}
