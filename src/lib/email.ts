import nodemailer from 'nodemailer'

// Configure email transporter
const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST || '',
	port: Number(process.env.EMAIL_PORT) || 0,
	secure: process.env.EMAIL_SECURE === 'true',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
})

type ApplicationData = {
	name: string
	email: string
	role: string
	projectName: string
	projectDescription: string
	problem: string
	solution: string
	projectCategory: string
	fundingAmount: string
	timeline: string
	experience: string
	whyWeb3: string
	successMetrics: string
	walletAddress: string
	signature: string
	message: string
	[key: string]: string
}

export async function sendApplicationEmail(data: ApplicationData): Promise<boolean> {
	try {
		// Format application data as HTML
		const htmlContent = `
			<h1>New Grant Application</h1>
			<h2>Applicant Information</h2>
			<p><strong>Name:</strong> ${data.name}</p>
			<p><strong>Email:</strong> ${data.email}</p>
			<p><strong>Role:</strong> ${data.role}</p>
			<p><strong>Wallet Address:</strong> ${data.walletAddress}</p>

			<h2>Project Details</h2>
			<p><strong>Project Name:</strong> ${data.projectName}</p>
			<p><strong>Category:</strong> ${data.projectCategory}</p>
			<p><strong>Funding Amount:</strong> ${data.fundingAmount}</p>
			<p><strong>Timeline:</strong> ${data.timeline}</p>

			<h2>Project Description</h2>
			<p>${data.projectDescription}</p>

			<h2>Problem Statement</h2>
			<p>${data.problem}</p>

			<h2>Proposed Solution</h2>
			<p>${data.solution}</p>

			<h2>Experience</h2>
			<p>${data.experience}</p>

			<h2>Why Web3</h2>
			<p>${data.whyWeb3}</p>

			<h2>Success Metrics</h2>
			<p>${data.successMetrics}</p>

			<h2>Verification</h2>
			<p><strong>Signature:</strong> ${data.signature}</p>
			<p><strong>Message:</strong> ${data.message}</p>
	    `

		// Send email
		const info = await transporter.sendMail({
			from: process.env.EMAIL_FROM || 'grants@game3.foundation',
			to: process.env.GRANT_RECIPIENT_EMAIL || 'grants@game3.foundation',
			cc: data.email, // Send a copy to the applicant
			subject: `Grant Application: ${data.projectName}`,
			html: htmlContent,
			replyTo: data.email,
		})

		console.log('Email sent:', info.messageId)
		return true
	} catch (error) {
		console.error('Error sending email:', error)
		return false
	}
}
