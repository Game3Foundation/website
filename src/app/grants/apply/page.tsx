'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@game3/components/ui/card'
import { Button } from '@game3/components/ui/button'
import { Input } from '@game3/components/ui/input'
import { Textarea } from '@game3/components/ui/textarea'
import { Label } from '@game3/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@game3/components/ui/radio-group'
import { Checkbox } from '@game3/components/ui/checkbox'
import { useToast } from '@game3/components/ui/use-toast'
import { useAccount, useSignMessage } from 'wagmi'
import { Alert, AlertDescription } from '@game3/components/ui/alert'

export default function GrantApplicationPage() {
	const router = useRouter()
	const { toast } = useToast()
	const [currentStep, setCurrentStep] = useState(1)
	const totalSteps = 3
	const { address, isConnected } = useAccount()
	const { signMessageAsync } = useSignMessage()

	// Form validation state
	const [errors, setErrors] = useState<Record<string, string>>({})

	const [formData, setFormData] = useState({
		// Step 1: Personal Information
		name: '',
		email: '',
		organization: '',
		role: '',
		location: '',
		website: '',
		twitter: '',

		// Step 2: Project Information
		projectName: '',
		projectDescription: '',
		problem: '',
		solution: '',
		targetAudience: '',
		projectCategory: '',
		fundingAmount: '',
		timeline: '',

		// Step 3: Additional Information
		experience: '',
		whyWeb3: '',
		successMetrics: '',
		challenges: '',
		openSource: false,
		termsAgreed: false,
		walletAddress: '',
	})

	const [isSubmitting, setIsSubmitting] = useState(false)

	// Update wallet address whenever it changes
	useEffect(() => {
		if (address) {
			setFormData((prev) => ({ ...prev, walletAddress: address }))
		}
	}, [address])

	// Redirect to connect wallet if not connected
	useEffect(() => {
		if (!isConnected && currentStep === 3) {
			toast({
				title: 'Wallet Connection Required',
				description: 'Please connect your wallet to complete the application.',
				variant: 'destructive',
			})
			setCurrentStep(2)
		}
	}, [isConnected, currentStep, toast])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))

		// Clear error when field is being edited
		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev }
				delete newErrors[name]
				return newErrors
			})
		}
	}

	const handleRadioChange = (value: string, fieldName: string) => {
		setFormData((prev) => ({ ...prev, [fieldName]: value }))

		// Clear error when field is being edited
		if (errors[fieldName]) {
			setErrors((prev) => {
				const newErrors = { ...prev }
				delete newErrors[fieldName]
				return newErrors
			})
		}
	}

	const handleCheckboxChange = (fieldName: string, checked: boolean) => {
		setFormData((prev) => ({ ...prev, [fieldName]: checked }))

		// Clear error when field is being edited
		if (errors[fieldName]) {
			setErrors((prev) => {
				const newErrors = { ...prev }
				delete newErrors[fieldName]
				return newErrors
			})
		}
	}

	const validateStep = (step: number): boolean => {
		const newErrors: Record<string, string> = {}

		if (step === 1) {
			if (!formData.name.trim()) newErrors.name = 'Name is required'
			if (!formData.email.trim()) {
				newErrors.email = 'Email is required'
			} else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
				newErrors.email = 'Please enter a valid email address'
			}
			if (!formData.role.trim()) newErrors.role = 'Role is required'
		}

		if (step === 2) {
			if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required'
			if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required'
			if (!formData.problem.trim()) newErrors.problem = 'Problem statement is required'
			if (!formData.solution.trim()) newErrors.solution = 'Solution is required'
			if (!formData.projectCategory) newErrors.projectCategory = 'Please select a category'
			if (!formData.fundingAmount) {
				newErrors.fundingAmount = 'Funding amount is required'
			} else if (isNaN(Number(formData.fundingAmount)) || Number(formData.fundingAmount) <= 0) {
				newErrors.fundingAmount = 'Please enter a valid funding amount'
			}
			if (!formData.timeline) {
				newErrors.timeline = 'Timeline is required'
			} else if (isNaN(Number(formData.timeline)) || Number(formData.timeline) <= 0) {
				newErrors.timeline = 'Please enter a valid timeline in months'
			}
		}

		if (step === 3) {
			if (!formData.experience.trim()) newErrors.experience = 'Experience is required'
			if (!formData.whyWeb3.trim()) newErrors.whyWeb3 = 'This field is required'
			if (!formData.successMetrics.trim()) newErrors.successMetrics = 'Success metrics are required'
			if (!formData.termsAgreed) newErrors.termsAgreed = 'You must agree to the terms'
			if (!isConnected) newErrors.walletAddress = 'Please connect your wallet'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const nextStep = () => {
		if (validateStep(currentStep)) {
			setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
		} else {
			// Scroll to first error
			const firstError = document.querySelector('[data-error="true"]')
			if (firstError) {
				firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
			}
		}
	}

	const prevStep = () => {
		setCurrentStep((prev) => Math.max(prev - 1, 1))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateStep(currentStep)) {
			// Scroll to first error
			const firstError = document.querySelector('[data-error="true"]')
			if (firstError) {
				firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
			}
			return
		}

		if (!isConnected) {
			toast({
				title: 'Wallet Connection Required',
				description: 'Please connect your wallet to submit the application.',
				variant: 'destructive',
			})
			return
		}

		setIsSubmitting(true)

		try {
			// Create message to sign
			const message = `I am submitting a grant application to Game3 Foundation for the project "${formData.projectName}" with the wallet address ${address}.`

			// Request signature from wallet
			const signature = await signMessageAsync({ message })

			// Send form data along with signature to API
			const response = await fetch('/api/submit-grant-application', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					signature,
					message,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to submit application')
			}

			toast({
				title: 'Application Submitted',
				description: "Thank you for your application. We'll review it and get back to you soon.",
			})

			// Redirect to success page
			router.push('/grants/application-success')
		} catch (error) {
			console.error('Error submitting form:', error)
			toast({
				title: 'Submission Failed',
				description: error instanceof Error ? error.message : 'Failed to submit application. Please try again.',
				variant: 'destructive',
			})
			setIsSubmitting(false)
		}
	}

	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-4xl font-medium mb-4 text-center">Grant Application</h1>

				{!isConnected && currentStep === 3 && (
					<Alert className="mb-6 bg-primary/20 border-primary text-white">
						<AlertDescription>
							Please connect your wallet to complete the application process.
						</AlertDescription>
					</Alert>
				)}

				<div className="mb-8">
					<div className="flex justify-between items-center">
						{Array.from({ length: totalSteps }, (_, i) => (
							<div
								key={i}
								className={`flex items-center justify-center w-10 h-10 rounded-full
                  ${currentStep > i + 1 ? 'bg-green-600' : currentStep === i + 1 ? 'bg-primary' : 'bg-gray-700'}
                  text-white font-medium`}
							>
								{i + 1}
							</div>
						)).reduce((acc, curr, idx) => {
							if (idx === 0) return [curr]
							return [
								...acc,
								<div
									key={`line-${idx}`}
									className={`flex-1 h-1 ${currentStep > idx ? 'bg-green-600' : 'bg-gray-700'}`}
								/>,
								curr,
							]
						}, [] as React.ReactNode[])}
					</div>
					<div className="flex justify-between mt-2">
						<div className="text-sm text-gray-400">Personal Info</div>
						<div className="text-sm text-gray-400">Project Details</div>
						<div className="text-sm text-gray-400">Additional Info</div>
					</div>
				</div>

				<Card className="bg-black border-gray-800 text-white">
					<CardHeader>
						<CardTitle className="font-medium">
							{currentStep === 1 && 'Personal Information'}
							{currentStep === 2 && 'Project Information'}
							{currentStep === 3 && 'Additional Information'}
						</CardTitle>
						<CardDescription className="text-gray-400">
							{currentStep === 1 && 'Tell us about yourself and your team.'}
							{currentStep === 2 && "Describe your project and what you're building."}
							{currentStep === 3 && 'Provide more details about your vision and approach.'}
						</CardDescription>
					</CardHeader>

					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-6">
							{/* Step 1: Personal Information */}
							{currentStep === 1 && (
								<>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2" data-error={!!errors.name}>
											<Label htmlFor="name" className="text-gray-300">
												Full Name *
											</Label>
											<Input
												id="name"
												name="name"
												value={formData.name}
												onChange={handleChange}
												required
												className={`bg-black border-gray-700 text-white ${
													errors.name ? 'border-red-500' : ''
												}`}
											/>
											{errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
										</div>
										<div className="space-y-2" data-error={!!errors.email}>
											<Label htmlFor="email" className="text-gray-300">
												Email *
											</Label>
											<Input
												id="email"
												name="email"
												type="email"
												value={formData.email}
												onChange={handleChange}
												required
												className={`bg-black border-gray-700 text-white ${
													errors.email ? 'border-red-500' : ''
												}`}
											/>
											{errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="organization" className="text-gray-300">
												Organization/Project Name
											</Label>
											<Input
												id="organization"
												name="organization"
												value={formData.organization}
												onChange={handleChange}
												className="bg-black border-gray-700 text-white"
											/>
										</div>
										<div className="space-y-2" data-error={!!errors.role}>
											<Label htmlFor="role" className="text-gray-300">
												Your Role *
											</Label>
											<Input
												id="role"
												name="role"
												value={formData.role}
												onChange={handleChange}
												required
												className={`bg-black border-gray-700 text-white ${
													errors.role ? 'border-red-500' : ''
												}`}
											/>
											{errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="location" className="text-gray-300">
											Location
										</Label>
										<Input
											id="location"
											name="location"
											value={formData.location}
											onChange={handleChange}
											className="bg-black border-gray-700 text-white"
										/>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="website" className="text-gray-300">
												Website (if any)
											</Label>
											<Input
												id="website"
												name="website"
												value={formData.website}
												onChange={handleChange}
												className="bg-black border-gray-700 text-white"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="twitter" className="text-gray-300">
												Twitter/X Handle
											</Label>
											<Input
												id="twitter"
												name="twitter"
												value={formData.twitter}
												onChange={handleChange}
												className="bg-black border-gray-700 text-white"
											/>
										</div>
									</div>
								</>
							)}

							{/* Step 2: Project Information */}
							{currentStep === 2 && (
								<>
									<div className="space-y-2" data-error={!!errors.projectName}>
										<Label htmlFor="projectName" className="text-gray-300">
											Project Name *
										</Label>
										<Input
											id="projectName"
											name="projectName"
											value={formData.projectName}
											onChange={handleChange}
											required
											className={`bg-black border-gray-700 text-white ${
												errors.projectName ? 'border-red-500' : ''
											}`}
										/>
										{errors.projectName && (
											<p className="text-sm text-red-500">{errors.projectName}</p>
										)}
									</div>

									<div className="space-y-2" data-error={!!errors.projectDescription}>
										<Label htmlFor="projectDescription" className="text-gray-300">
											Project Description *
										</Label>
										<Textarea
											id="projectDescription"
											name="projectDescription"
											value={formData.projectDescription}
											onChange={handleChange}
											required
											className={`bg-black border-gray-700 text-white min-h-[120px] ${
												errors.projectDescription ? 'border-red-500' : ''
											}`}
											placeholder="Describe your project in detail. What are you building?"
										/>
										{errors.projectDescription && (
											<p className="text-sm text-red-500">{errors.projectDescription}</p>
										)}
									</div>

									<div className="space-y-2" data-error={!!errors.problem}>
										<Label htmlFor="problem" className="text-gray-300">
											Problem Statement *
										</Label>
										<Textarea
											id="problem"
											name="problem"
											value={formData.problem}
											onChange={handleChange}
											required
											className={`bg-black border-gray-700 text-white ${
												errors.problem ? 'border-red-500' : ''
											}`}
											placeholder="What problem are you solving?"
										/>
										{errors.problem && <p className="text-sm text-red-500">{errors.problem}</p>}
									</div>

									<div className="space-y-2" data-error={!!errors.solution}>
										<Label htmlFor="solution" className="text-gray-300">
											Your Solution *
										</Label>
										<Textarea
											id="solution"
											name="solution"
											value={formData.solution}
											onChange={handleChange}
											required
											className={`bg-black border-gray-700 text-white ${
												errors.solution ? 'border-red-500' : ''
											}`}
											placeholder="How does your project solve this problem?"
										/>
										{errors.solution && <p className="text-sm text-red-500">{errors.solution}</p>}
									</div>

									<div className="space-y-2">
										<Label htmlFor="targetAudience" className="text-gray-300">
											Target Audience
										</Label>
										<Input
											id="targetAudience"
											name="targetAudience"
											value={formData.targetAudience}
											onChange={handleChange}
											className="bg-black border-gray-700 text-white"
											placeholder="Who will use or benefit from your project?"
										/>
									</div>

									<div className="space-y-2" data-error={!!errors.projectCategory}>
										<Label className="text-gray-300">Project Category *</Label>
										<RadioGroup
											value={formData.projectCategory}
											onValueChange={(value) => handleRadioChange(value, 'projectCategory')}
											className="flex flex-col space-y-2"
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="infrastructure" id="infrastructure" />
												<Label htmlFor="infrastructure" className="text-gray-300">
													Blockchain Gaming Infrastructure
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="ai-content" id="ai-content" />
												<Label htmlFor="ai-content" className="text-gray-300">
													AI-Powered Game Content Generation
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="virtual-economies" id="virtual-economies" />
												<Label htmlFor="virtual-economies" className="text-gray-300">
													Decentralized Virtual Economies
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="autonomous-agents" id="autonomous-agents" />
												<Label htmlFor="autonomous-agents" className="text-gray-300">
													Autonomous Game Agents and NPCs
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="cross-game" id="cross-game" />
												<Label htmlFor="cross-game" className="text-gray-300">
													Cross-Game Identity and Assets
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="other" id="other" />
												<Label htmlFor="other" className="text-gray-300">
													Other
												</Label>
											</div>
										</RadioGroup>
										{errors.projectCategory && (
											<p className="text-sm text-red-500">{errors.projectCategory}</p>
										)}
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2" data-error={!!errors.fundingAmount}>
											<Label htmlFor="fundingAmount" className="text-gray-300">
												Requested Funding Amount (USD) *
											</Label>
											<Input
												id="fundingAmount"
												name="fundingAmount"
												type="number"
												value={formData.fundingAmount}
												onChange={handleChange}
												required
												className={`bg-black border-gray-700 text-white ${
													errors.fundingAmount ? 'border-red-500' : ''
												}`}
												placeholder="5000"
											/>
											{errors.fundingAmount && (
												<p className="text-sm text-red-500">{errors.fundingAmount}</p>
											)}
										</div>
										<div className="space-y-2" data-error={!!errors.timeline}>
											<Label htmlFor="timeline" className="text-gray-300">
												Estimated Timeline (months) *
											</Label>
											<Input
												id="timeline"
												name="timeline"
												type="number"
												value={formData.timeline}
												onChange={handleChange}
												required
												className={`bg-black border-gray-700 text-white ${
													errors.timeline ? 'border-red-500' : ''
												}`}
												placeholder="3"
											/>
											{errors.timeline && (
												<p className="text-sm text-red-500">{errors.timeline}</p>
											)}
										</div>
									</div>
								</>
							)}

							{/* Step 3: Additional Information */}
							{currentStep === 3 && (
								<>
									<div className="space-y-2" data-error={!!errors.experience}>
										<Label htmlFor="experience" className="text-gray-300">
											Relevant Experience *
										</Label>
										<Textarea
											id="experience"
											name="experience"
											value={formData.experience}
											onChange={handleChange}
											required
											className={`bg-black border-gray-700 text-white min-h-[100px] ${
												errors.experience ? 'border-red-500' : ''
											}`}
											placeholder="Describe your team's experience and qualifications relevant to this project."
										/>
										{errors.experience && (
											<p className="text-sm text-red-500">{errors.experience}</p>
										)}
									</div>

									<div className="space-y-2" data-error={!!errors.whyWeb3}>
										<Label htmlFor="whyWeb3" className="text-gray-300">
											Why Web3 Gaming? *
										</Label>
										<Textarea
											id="whyWeb3"
											name="whyWeb3"
											value={formData.whyWeb3}
											onChange={handleChange}
											required
											className={`bg-black border-gray-700 text-white ${
												errors.whyWeb3 ? 'border-red-500' : ''
											}`}
											placeholder="Explain why blockchain/web3 technologies are essential for your project."
										/>
										{errors.whyWeb3 && <p className="text-sm text-red-500">{errors.whyWeb3}</p>}
									</div>

									<div className="space-y-2" data-error={!!errors.successMetrics}>
										<Label htmlFor="successMetrics" className="text-gray-300">
											Success Metrics *
										</Label>
										<Textarea
											id="successMetrics"
											name="successMetrics"
											value={formData.successMetrics}
											onChange={handleChange}
											required
											className={`bg-black border-gray-700 text-white ${
												errors.successMetrics ? 'border-red-500' : ''
											}`}
											placeholder="How will you measure the success of your project?"
										/>
										{errors.successMetrics && (
											<p className="text-sm text-red-500">{errors.successMetrics}</p>
										)}
									</div>

									<div className="space-y-2">
										<Label htmlFor="challenges" className="text-gray-300">
											Anticipated Challenges
										</Label>
										<Textarea
											id="challenges"
											name="challenges"
											value={formData.challenges}
											onChange={handleChange}
											className="bg-black border-gray-700 text-white"
											placeholder="What challenges do you foresee and how will you address them?"
										/>
									</div>

									<div className="flex items-center space-x-2">
										<Checkbox
											id="openSource"
											checked={formData.openSource}
											onCheckedChange={(checked) =>
												handleCheckboxChange('openSource', checked as boolean)
											}
										/>
										<Label htmlFor="openSource" className="text-gray-300">
											This project will be open-source or will have significant open-source
											components.
										</Label>
									</div>

									<div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
										<h3 className="font-medium mb-2">Wallet Information</h3>
										<p className="text-gray-300 mb-4">
											This application will be associated with your connected wallet address. If
											approved, grant funds will be sent to this address.
										</p>
										<div className="flex items-center space-x-2">
											<div className="text-gray-300 font-mono bg-black px-3 py-2 rounded border border-gray-700 flex-1 overflow-hidden overflow-ellipsis">
												{address || 'Please connect your wallet'}
											</div>
											{!isConnected && (
												<Button
													type="button"
													onClick={prevStep}
													className="bg-primary hover:bg-primary/90"
												>
													Connect Wallet
												</Button>
											)}
										</div>
										{errors.walletAddress && (
											<p className="text-sm text-red-500 mt-2">{errors.walletAddress}</p>
										)}
									</div>

									<div className="flex items-center space-x-2" data-error={!!errors.termsAgreed}>
										<Checkbox
											id="termsAgreed"
											checked={formData.termsAgreed}
											onCheckedChange={(checked) =>
												handleCheckboxChange('termsAgreed', checked as boolean)
											}
											required
											className={errors.termsAgreed ? 'border-red-500' : ''}
										/>
										<Label htmlFor="termsAgreed" className="text-gray-300">
											I agree to the terms and conditions of the Game3 Foundation Grants Program.
											*
										</Label>
										{errors.termsAgreed && (
											<p className="text-sm text-red-500">{errors.termsAgreed}</p>
										)}
									</div>
								</>
							)}
						</CardContent>

						<CardFooter className="flex justify-between pt-6">
							{currentStep > 1 ? (
								<Button
									type="button"
									onClick={prevStep}
									variant="outline"
									className="bg-transparent text-white border-gray-600 hover:bg-gray-800"
								>
									Back
								</Button>
							) : (
								<div></div> // Empty div to maintain flex spacing
							)}

							{currentStep < totalSteps ? (
								<Button type="button" onClick={nextStep} className="bg-primary hover:bg-primary/90">
									Next
								</Button>
							) : (
								<Button
									type="submit"
									disabled={isSubmitting || !formData.termsAgreed || !isConnected}
									className="bg-primary hover:bg-primary/90"
								>
									{isSubmitting ? 'Submitting...' : 'Sign & Submit Application'}
								</Button>
							)}
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	)
}
