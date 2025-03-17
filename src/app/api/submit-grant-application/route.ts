import { NextResponse } from 'next/server'
import { verifyMessage } from 'viem'

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

		// Here you would typically store the application in a database
		// For this example, we'll just log it to the console
		console.log('Received grant application:', formData)

		// You might also want to send notification emails, etc.

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Error processing grant application:', error)
		return NextResponse.json({ error: 'Failed to process application' }, { status: 500 })
	}
}
