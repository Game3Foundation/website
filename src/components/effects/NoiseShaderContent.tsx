'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function NoiseShaderContent() {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		if (!canvasRef.current) return

		const canvas = canvasRef.current
		const renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true,
			antialias: false,
		})

		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		const scene = new THREE.Scene()
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

		// Create a plane to display the shader
		const geometry = new THREE.PlaneGeometry(2, 2)

		// Improved monochrome pixel noise shader
		const noiseShader = {
			uniforms: {
				time: { value: 0 },
				resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
				noiseIntensity: { value: 0.028 }, // Fine-tuned noise strength
				pixelDensity: { value: 220.0 }, // Controls pixel size
				noiseThreshold: { value: 0.96 }, // Controls density of visible pixels
			},
			vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
			fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        uniform float noiseIntensity;
        uniform float pixelDensity;
        uniform float noiseThreshold;
        varying vec2 vUv;

        // Better random function for noise generation
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        // 2D noise function
        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);

          // Four corners in 2D of a tile
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));

          // Smooth interpolation
          vec2 u = f * f * (3.0 - 2.0 * f);

          return mix(a, b, u.x) +
                  (c - a) * u.y * (1.0 - u.x) +
                  (d - b) * u.x * u.y;
        }

        void main() {
          // Create pixelated coordinates based on screen resolution
          vec2 pixelCoord = floor(gl_FragCoord.xy / (resolution.y / pixelDensity)) * (resolution.y / pixelDensity);
          vec2 pixelatedUv = pixelCoord / resolution.xy;

          // Add time to create dynamic noise
          float n = noise(pixelatedUv * 5.0 + time * 0.02);

          // Create monochrome pixel noise with threshold
          float monoNoise = step(noiseThreshold, n) * noiseIntensity;

          // Subtle vignette effect
          vec2 center = vUv - 0.5;
          float vignette = smoothstep(0.5, 0.2, length(center));

          // Output final color with vignette
          gl_FragColor = vec4(vec3(monoNoise), monoNoise * vignette);
        }
      `,
		}

		const material = new THREE.ShaderMaterial({
			uniforms: noiseShader.uniforms,
			vertexShader: noiseShader.vertexShader,
			fragmentShader: noiseShader.fragmentShader,
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthTest: false,
		})

		const mesh = new THREE.Mesh(geometry, material)
		scene.add(mesh)

		let frameId: number
		const clock = new THREE.Clock()

		// Handle window resize
		const handleResize = () => {
			if (!canvasRef.current) return

			const width = window.innerWidth
			const height = window.innerHeight

			renderer.setSize(width, height)
			material.uniforms.resolution.value.set(width, height)
		}

		window.addEventListener('resize', handleResize)

		// Initialize size
		handleResize()

		// Animation loop
		const animate = () => {
			material.uniforms.time.value = clock.getElapsedTime()
			renderer.render(scene, camera)
			frameId = requestAnimationFrame(animate)
		}

		animate()

		// Cleanup on unmount
		return () => {
			cancelAnimationFrame(frameId)
			window.removeEventListener('resize', handleResize)
			geometry.dispose()
			material.dispose()
			renderer.dispose()
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 w-full h-full pointer-events-none z-50 opacity-20"
			style={{ mixBlendMode: 'screen' }}
		/>
	)
}
