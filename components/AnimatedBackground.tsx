"use client";

import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let width = (canvas.width = window.innerWidth);
		let height = (canvas.height = window.innerHeight);

		const onResize = () => {
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		};
		window.addEventListener('resize', onResize);

		// Reduce particle count on mobile for better performance
		const isMobile = window.innerWidth <= 768;
		const baseParticleCount = Math.min(80, Math.floor((width * height) / 20000));
		const particleCount = isMobile ? Math.floor(baseParticleCount * 0.6) : baseParticleCount;
		
		const particles = Array.from({ length: particleCount }).map(() => ({
			x: Math.random() * width,
			y: Math.random() * height,
			s: 0.5 + Math.random() * 1.5,
			dx: -0.5 + Math.random(),
			dy: -0.5 + Math.random()
		}));

		let raf = 0;
		let lastTime = 0;
		const targetFPS = isMobile ? 30 : 60; // Lower FPS on mobile
		const frameInterval = 1000 / targetFPS;

		const loop = (currentTime: number) => {
			raf = requestAnimationFrame(loop);
			
			// Throttle FPS on mobile
			if (isMobile && currentTime - lastTime < frameInterval) {
				return;
			}
			lastTime = currentTime;

			ctx.clearRect(0, 0, width, height);

			const grad = ctx.createLinearGradient(0, 0, width, height);
			grad.addColorStop(0, '#0ea5ea');
			grad.addColorStop(1, '#7b61ff');
			ctx.fillStyle = grad;
			ctx.globalAlpha = 0.12;
			ctx.fillRect(0, 0, width, height);
			ctx.globalAlpha = 1;

			ctx.fillStyle = 'rgba(255,255,255,0.45)';
			particles.forEach((p) => {
				p.x += p.dx * p.s;
				p.y += p.dy * p.s;
				if (p.x < -5) p.x = width + 5;
				if (p.x > width + 5) p.x = -5;
				if (p.y < -5) p.y = height + 5;
				if (p.y > height + 5) p.y = -5;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
				ctx.fill();
			});
		};
		loop(0);
		
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return (
		<div className="animatedBg">
			<canvas ref={canvasRef} />
			<div className="gradientOverlay" />
		</div>
	);
}
