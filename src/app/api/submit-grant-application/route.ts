import { NextResponse } from 'next/server'
import { verifyMessage } from 'viem'
import { sendApplicationEmail } from '@game3/lib/email'

export async function POST(request: Request) {
	try {
		const formData = await request.json()

		// Validate that required fields exist
		const requiredFields = [
			'name',
			'email',
			'role',
			'projectName',
			'projectDescription',
			'problem',
			'solution',
			'projectCategory',
			'fundingAmount',
			'timeline',
			'experience',
			'whyWeb3',
			'successMetrics',
			'walletAddress',
			'signature',
			'message',
		]

		for (const field of requiredFields) {
			if (!formData[field]) {
				return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
			}
		}

		// Verify the signature
		const isValidSignature = await verifyMessage({
			address: formData.walletAddress,
			message: formData.message,
			signature: formData.signature as `0x${string}`,
		})

		if (!isValidSignature) {
			return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
		}

		// Send application via email
		const emailSent = await sendApplicationEmail(formData)

		if (!emailSent) {
			console.warn('Failed to send email notification, but application was processed')
		}

		// Here you would typically store the application in a database
		console.log('Received grant application:', formData)

		return NextResponse.json({
			success: true,
			emailSent,
		})
	} catch (error) {
		console.error('Error processing grant application:', error)
		return NextResponse.json({ error: 'Failed to process application' }, { status: 500 })
	}
}
