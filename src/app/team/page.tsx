export default function TeamPage() {
	const teamMembers = [
		{
			name: 'Dr. Alex Thompson',
			role: 'Founder & CEO',
			bio: 'Former game studio executive with 15+ years in the industry. PhD in Computer Science specializing in distributed systems.',
		},
		{
			name: 'Maya Rodriguez',
			role: 'Research Director',
			bio: 'Leading our cutting-edge research initiatives in blockchain gaming and web3 technologies.',
		},
		{
			name: 'Kai Nakamura',
			role: 'Technical Lead',
			bio: 'Blockchain architect with expertise in layer-1 solutions and gaming integrations.',
		},
		{
			name: 'Sophia Chen',
			role: 'Community Director',
			bio: 'Building bridges between developers, players, and the web3 ecosystem.',
		},
	]

	return (
		<div className="container mx-auto px-4 py-16">
			<h1 className="text-4xl font-normal mb-8 text-center">Our Team</h1>

			<p className="text-xl text-center max-w-3xl mx-auto mb-12">
				The Game3 Foundation is led by a team of passionate gaming industry veterans, blockchain experts, and
				community builders.
			</p>

			{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				{teamMembers.map((member, index) => (
					<div key={index} className="bg-black p-6 rounded-lg border border-gray-800">
						<h2 className="text-2xl font-normal mb-1">{member.name}</h2>
						<p className="text-purple-400 mb-3">{member.role}</p>
						<p className="text-gray-400">{member.bio}</p>
					</div>
				))}
			</div> */}
		</div>
	)
}
