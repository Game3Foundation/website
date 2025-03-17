'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Three.js code to avoid server-side rendering issues
const NoiseShaderContent = dynamic(() => import('./NoiseShaderContent'), {
	ssr: false,
	loading: () => null,
})

export default function NoiseShader() {
	// This component just serves as a client-side wrapper
	return <NoiseShaderContent />
}
