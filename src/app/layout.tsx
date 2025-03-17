import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Noto_Sans } from 'next/font/google'

import { WalletProvider } from '@game3/providers/wallet-provider'
import { ThemeProvider } from '@game3/providers/theme-provider'

import Header from '@game3/components/layout/header'
import Footer from '@game3/components/layout/footer'
import { Toaster } from '@game3/components/ui/toaster'

import './globals.css'

// Dynamically import NoiseShader with no server-side rendering
const NoiseShader = dynamic(() => import('@game3/components/effects/NoiseShader'), { ssr: false })

// Load Noto Sans font
const notoSans = Noto_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Game3 Foundation',
	description: 'Research and development for video games in web3',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={notoSans.className}>
				<WalletProvider>
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
						<Header />
						<main className="pt-16">{children}</main>
						<Footer />
						<Toaster />
						<NoiseShader />
					</ThemeProvider>
				</WalletProvider>
			</body>
		</html>
	)
}
