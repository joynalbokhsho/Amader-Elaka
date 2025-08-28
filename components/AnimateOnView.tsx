"use client";

import { useEffect, useRef, useState } from 'react';

type AnimateOnViewProps = {
	children: React.ReactNode;
	className?: string;
	rootMargin?: string;
	threshold?: number | number[];
};

export function AnimateOnView({ children, className, rootMargin = "0px 0px -10% 0px", threshold = 0.2 }: AnimateOnViewProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) setVisible(true);
			});
		}, { root: null, rootMargin, threshold });
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [rootMargin, threshold]);

	return (
		<div ref={ref} className={`${className ?? ''} reveal${visible ? ' isVisible' : ''}`}>
			{children}
		</div>
	);
}
