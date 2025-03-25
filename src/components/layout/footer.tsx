'use client'
import Link from 'next/link'

export default function Footer() {
	return (
		<footer className="border-t border-border bg-background">
			<div className="container mx-auto px-4 py-4">
				<div className="grid grid-cols-1 md:grid-cols-5 gap-8">
					<div>
						<h3 className="font-medium mb-4 text-sm">Game3 Foundation</h3>
						<p className="text-sm text-muted-foreground mb-4">
							Advancing research and development for the video game industry.
						</p>
					</div>

					<div>
						<h3 className="font-medium mb-4 text-sm">Resources</h3>
						<ul className="">
							<li>
								<Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
									About
								</Link>
							</li>
							<li>
								<Link href="/mission" className="text-sm text-muted-foreground hover:text-foreground">
									Mission
								</Link>
							</li>
							<li>
								<Link
									href="/initiatives"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Initiatives
								</Link>
							</li>
							<li>
								<Link href="/grants" className="text-sm text-muted-foreground hover:text-foreground">
									Grants
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-medium mb-4 text-sm">Community</h3>
						<ul>
							<li>
								<a
									href="https://twitter.com/game3foundation"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Twitter
								</a>
							</li>
							<li>
								<a
									href="https://discord.gg/h2VMgWY"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Discord
								</a>
							</li>
							<li>
								<a
									href="https://github.com/game3foundation"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									GitHub
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-medium mb-4 text-sm">Legal</h3>
						<ul>
							<li>
								<Link href="/imprint" className="text-sm text-muted-foreground hover:text-foreground">
									Imprint
								</Link>
							</li>
							<li>
								<Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
									Terms of Service
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} Game3 Foundation. All rights reserved.
					</p>
					<div className="mt-4 md:mt-0">
						<p className="text-sm text-muted-foreground">Let's build better games. </p>
					</div>
				</div>
			</div>
		</footer>
	)
}
