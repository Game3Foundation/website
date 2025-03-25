'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@game3/components/ui/card'
import { Button } from '@game3/components/ui/button'
import { Input } from '@game3/components/ui/input'
import { Textarea } from '@game3/components/ui/textarea'
import { useToast } from '@game3/components/ui/use-toast'

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { toast } = useToast()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		// Simulate form submission
		await new Promise((resolve) => setTimeout(resolve, 1500))

		toast({
			title: 'Message Sent',
			description: "We've received your message and will get back to you soon.",
		})

		setFormData({ name: '', email: '', subject: '', message: '' })
		setIsSubmitting(false)
	}

	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-4xl font-medium mb-4 text-center">Contact Us</h1>
				<p className="text-xl text-gray-400 max-w-2xl mx-auto text-center mb-12">
					Have questions about our research or interested in collaboration? We'd love to hear from you.
				</p>

				<Card className="bg-black border-gray-800 text-white">
					<CardHeader>
						<CardTitle className="font-medium">Get in Touch</CardTitle>
						<CardDescription className="text-gray-400">
							Fill out the form below and we'll get back to you as soon as possible.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label htmlFor="name" className="text-sm text-gray-300">
										Name
									</label>
									<Input
										id="name"
										name="name"
										placeholder="Your name"
										value={formData.name}
										onChange={handleChange}
										required
										className="bg-black border-gray-700 text-white"
									/>
								</div>
								<div className="space-y-2">
									<label htmlFor="email" className="text-sm text-gray-300">
										Email
									</label>
									<Input
										id="email"
										name="email"
										type="email"
										placeholder="Your email"
										value={formData.email}
										onChange={handleChange}
										required
										className="bg-black border-gray-700 text-white"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<label htmlFor="subject" className="text-sm text-gray-300">
									Subject
								</label>
								<Input
									id="subject"
									name="subject"
									placeholder="Subject of your message"
									value={formData.subject}
									onChange={handleChange}
									required
									className="bg-black border-gray-700 text-white"
								/>
							</div>

							<div className="space-y-2">
								<label htmlFor="message" className="text-sm text-gray-300">
									Message
								</label>
								<Textarea
									id="message"
									name="message"
									placeholder="Your message"
									value={formData.message}
									onChange={handleChange}
									required
									className="bg-black border-gray-700 text-white min-h-[150px]"
								/>
							</div>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-primary hover:bg-primary/90"
							>
								{isSubmitting ? 'Sending...' : 'Send Message'}
							</Button>
						</form>
					</CardContent>
				</Card>

				<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
					<div>
						<h3 className="text-xl font-medium mb-2">Email</h3>
						<p className="text-gray-400">hey@game3.foundation</p>
					</div>
					<div>
						<h3 className="text-xl font-medium mb-2">Discord</h3>
						<p className="text-gray-400">
							Join our{' '}
							<a href="https://discord.gg/h2VMgWY" className="text-primary hover:text-primary/80">
								Discord server
							</a>
						</p>
					</div>
					<div>
						<h3 className="text-xl font-medium mb-2">Twitter</h3>
						<p className="text-gray-400">
							Follow us{' '}
							<a href="https://x.com/game3foundation" className="text-primary hover:text-primary/80">
								@game3foundation
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
