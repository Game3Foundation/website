import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { WalletProvider } from '@game3/providers/wallet-provider'
import { ThemeProvider } from '@game3/providers/theme-provider'

import Header from '@game3/components/layout/header'
import Footer from '@game3/components/layout/footer'
import { Toaster } from '@game3/components/ui/toaster'

import './globals.css'

const poppins = Poppins({
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
			<body className={`${poppins.className} flex flex-col min-h-screen`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<WalletProvider>
						<Header />
						<main className="pt-16 flex-grow">{children}</main>
						<Footer />
						<Toaster />
					</WalletProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
