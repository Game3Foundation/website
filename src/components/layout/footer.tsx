'use client'

import Link from 'next/link'
import { FaTwitter, FaDiscord, FaTelegram, FaGithub } from 'react-icons/fa'

const footerLinks = [
	{
		title: 'About',
		links: [
			{ name: 'Mission', href: '/mission' },
			{ name: 'Team', href: '/team' },
			{ name: 'Partners', href: '/partners' },
			{ name: 'Careers', href: '/careers' },
		],
	},
	{
		title: 'Projects',
		links: [
			{ name: 'GameDAO', href: 'https://gamedao.co' },
			{ name: 'Z3 Network', href: 'https://zero.io' },
			{ name: 'Battlepass', href: '/initiatives/battlepass' },
			{ name: 'Research', href: '/initiatives/research' },
		],
	},
	{
		title: 'Resources',
		links: [
			{ name: 'Documentation', href: '/docs' },
			{ name: 'Blog', href: '/blog' },
			{ name: 'Whitepaper', href: '/whitepaper' },
			{ name: 'FAQ', href: '/faq' },
		],
	},
]

const socialLinks = [
	{ name: 'Twitter', icon: <FaTwitter size={20} />, href: 'https://twitter.com/game3foundation' },
	{ name: 'Discord', icon: <FaDiscord size={20} />, href: 'https://discord.gg/game3foundation' },
	{ name: 'Telegram', icon: <FaTelegram size={20} />, href: 'https://t.me/game3foundation' },
	{ name: 'GitHub', icon: <FaGithub size={20} />, href: 'https://github.com/game3foundation' },
]

export default function Footer() {
	return (
		<footer className="bg-black text-white py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h3 className="text-xl font-medium mb-4">Game3 Foundation</h3>
						<p className="text-gray-400">Research and development for video games in web3.</p>
					</div>

					<div>
						<h3 className="text-xl font-medium mb-4">Links</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/" className="text-gray-400 hover:text-white">
									Home
								</Link>
							</li>
							<li>
								<Link href="/about" className="text-gray-400 hover:text-white">
									About
								</Link>
							</li>
							<li>
								<Link href="/initiatives" className="text-gray-400 hover:text-white">
									Initiatives
								</Link>
							</li>
							<li>
								<Link href="/grants" className="text-gray-400 hover:text-white">
									Grants
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-xl font-medium mb-4">Contact</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/contact" className="text-gray-400 hover:text-white">
									Contact Us
								</Link>
							</li>
							<li>
								<a href="https://twitter.com/game3_official" className="text-gray-400 hover:text-white">
									Twitter
								</a>
							</li>
							<li>
								<a href="https://discord.gg/game3" className="text-gray-400 hover:text-white">
									Discord
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-xl font-medium mb-4">Get Involved</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/grants/apply" className="text-gray-400 hover:text-white">
									Apply for Grant
								</Link>
							</li>
							<li>
								<Link href="/about" className="text-gray-400 hover:text-white">
									Community
								</Link>
							</li>
							<li>
								<Link
									href="https://github.com/game3foundation"
									className="text-gray-400 hover:text-white"
								>
									GitHub
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-gray-800 mt-8 pt-8 text-left text-gray-500">
					<div className="flex flex-col sm:flex-row justify-between">
						<p>© {new Date().getFullYear()} Game3 Foundation. All rights reserved.</p>
						<div className="mt-2 sm:mt-0 space-x-4">
							<Link href="/privacy" className="text-gray-500 hover:text-gray-400">
								Privacy Policy
							</Link>
							<Link href="/terms" className="text-gray-500 hover:text-gray-400">
								Terms of Service
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
