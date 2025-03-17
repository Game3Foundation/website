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
		<footer className="border-t border-border bg-background">
			<div className="container mx-auto px-4 py-4">
				<div className="grid grid-cols-1 md:grid-cols-5 gap-8">
					<div>
						<h3 className="font-medium mb-4 text-[10px]">Game3 Foundation</h3>
						<p className="text-[10px] text-muted-foreground mb-4">
							Advancing research and development for the video game industry.
						</p>
					</div>

					<div>
						<h3 className="font-medium mb-4 text-[10px]">Resources</h3>
						<ul className="">
							<li>
								<Link href="/about" className="text-[10px] text-muted-foreground hover:text-foreground">
									About
								</Link>
							</li>
							<li>
								<Link
									href="/mission"
									className="text-[10px] text-muted-foreground hover:text-foreground"
								>
									Mission
								</Link>
							</li>
							<li>
								<Link
									href="/initiatives"
									className="text-[10px] text-muted-foreground hover:text-foreground"
								>
									Initiatives
								</Link>
							</li>
							<li>
								<Link
									href="/grants"
									className="text-[10px] text-muted-foreground hover:text-foreground"
								>
									Grants
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-medium mb-4 text-[10px]">Community</h3>
						<ul>
							<li>
								<a
									href="https://twitter.com/game3foundation"
									target="_blank"
									rel="noopener noreferrer"
									className="text-[10px] text-muted-foreground hover:text-foreground"
								>
									Twitter
								</a>
							</li>
							<li>
								<a
									href="https://discord.gg/h2VMgWY"
									target="_blank"
									rel="noopener noreferrer"
									className="text-[10px] text-muted-foreground hover:text-foreground"
								>
									Discord
								</a>
							</li>
							<li>
								<a
									href="https://github.com/game3foundation"
									target="_blank"
									rel="noopener noreferrer"
									className="text-[10px] text-muted-foreground hover:text-foreground"
								>
									GitHub
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-medium mb-4 text-[10px]">Legal</h3>
						<ul>
							<li>
								<Link
									href="/privacy"
									className="text-[10px] text-muted-foreground hover:text-foreground"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href="/terms" className="text-[10px] text-muted-foreground hover:text-foreground">
									Terms of Service
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-[10px] text-muted-foreground">
						© {new Date().getFullYear()} Game3 Foundation. All rights reserved.
					</p>
					<div className="mt-4 md:mt-0">
						<p className="text-[10px] text-muted-foreground">
							Building the decentralized future of gaming.
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
