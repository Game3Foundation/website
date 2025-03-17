'use client'

import React, { useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useWindowSize } from '@game3/hooks/useWindowSize'

// Simplified WebGL-based noise shader (without using react-three-fiber)
export default function GlslNoiseShader() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const requestRef = useRef<number | null>(null)
	const { theme } = useTheme()
	const { width, height } = useWindowSize()

	// GLSL shaders
	const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0, 1);
    }
  `

	const fragmentShaderSource = `
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec3 u_color;

    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;

      float n = noise(uv * 1.5 + u_time * 0.1);
      n += noise(uv * 3.0 - u_time * 0.05) * 0.5;
      n += noise(uv * 6.0 + u_time * 0.02) * 0.25;
      n += noise(uv * 12.0 - u_time * 0.01) * 0.125;
      n = n / (1.0 + 0.5 + 0.25 + 0.125);

      n *= 0.3;
      gl_FragColor = vec4(u_color * n, 1.0);
    }
  `

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		// Initialize WebGL context
		const gl = canvas.getContext('webgl')
		if (!gl) {
			console.error('WebGL not supported')
			return
		}

		// Set canvas size
		canvas.width = width
		canvas.height = height
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

		// Create shaders
		const vertexShader = gl.createShader(gl.VERTEX_SHADER)
		const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
		if (!vertexShader || !fragmentShader) return

		gl.shaderSource(vertexShader, vertexShaderSource)
		gl.shaderSource(fragmentShader, fragmentShaderSource)

		// Compile shaders
		gl.compileShader(vertexShader)
		if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
			console.error('Vertex shader compilation failed:', gl.getShaderInfoLog(vertexShader))
			return
		}

		gl.compileShader(fragmentShader)
		if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
			console.error('Fragment shader compilation failed:', gl.getShaderInfoLog(fragmentShader))
			return
		}

		// Create program
		const program = gl.createProgram()
		if (!program) return

		gl.attachShader(program, vertexShader)
		gl.attachShader(program, fragmentShader)
		gl.linkProgram(program)

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error('Program linking failed:', gl.getProgramInfoLog(program))
			return
		}

		// Create buffer for rectangle covering the entire screen
		const positionBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]), gl.STATIC_DRAW)

		// Get attribute and uniform locations
		const positionLocation = gl.getAttribLocation(program, 'a_position')
		const timeLocation = gl.getUniformLocation(program, 'u_time')
		const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
		const colorLocation = gl.getUniformLocation(program, 'u_color')

		// Set theme-based color
		const getThemeColor = () =>
			theme === 'dark'
				? [1, 1, 0] // Subtle blue for dark mode
				: [0.9, 0.9, 0.9] // Light gray for light mode

		// Animation loop
		let startTime = performance.now()
		const render = () => {
			if (!gl) return

			// Update time
			const currentTime = (performance.now() - startTime) / 1000

			// Clear canvas
			gl.clearColor(0, 0, 0, 0)
			gl.clear(gl.COLOR_BUFFER_BIT)

			// Use shader program
			gl.useProgram(program)

			// Update uniforms
			gl.uniform1f(timeLocation, currentTime)
			gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
			gl.uniform3fv(colorLocation, getThemeColor())

			// Set position attribute
			gl.enableVertexAttribArray(positionLocation)
			gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
			gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

			// Draw
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

			// Continue animation loop
			requestRef.current = requestAnimationFrame(render)
		}

		// Start animation
		requestRef.current = requestAnimationFrame(render)

		// Cleanup
		return () => {
			if (requestRef.current) {
				cancelAnimationFrame(requestRef.current)
			}
			gl.deleteProgram(program)
			gl.deleteShader(vertexShader)
			gl.deleteShader(fragmentShader)
			gl.deleteBuffer(positionBuffer)
		}
	}, [width, height, theme])

	return (
		<canvas
			ref={canvasRef}
			className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0 opacity-40 mix-blend-hard-light"
		/>
	)
}
