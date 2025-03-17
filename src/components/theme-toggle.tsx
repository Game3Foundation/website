'use client'

import { useTheme } from 'next-themes'
import { Button } from '@game3/components/ui/button'
import { SunIcon, MoonIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	// Avoid hydration mismatch
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	const isDark = theme === 'dark'

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
			className="rounded-full h-9 w-9"
		>
			{isDark ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5 text-slate-900" />}
			<span className="sr-only">{isDark ? 'Light mode' : 'Dark mode'}</span>
		</Button>
	)
}
