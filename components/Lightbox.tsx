"use client";

import { useEffect, useState, useCallback } from 'react';

type LightboxProps = {
	images: string[];
	initialIndex: number;
	onClose: () => void;
};

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
	const [index, setIndex] = useState(initialIndex);
	const go = useCallback((dir: -1 | 1) => setIndex((i) => (i + dir + images.length) % images.length), [images.length]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
			if (e.key === 'ArrowRight') go(1);
			if (e.key === 'ArrowLeft') go(-1);
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [go, onClose]);

	return (
		<div className="lbRoot" onClick={onClose}>
			<div className="lbInner" onClick={(e) => e.stopPropagation()}>
				<img className="lbImg" src={images[index]} alt="Gallery item" />
				<div className="lbControls">
					<button className="lbBtn" onClick={() => go(-1)} aria-label="Previous">‹</button>
					<button className="lbBtn" onClick={() => go(1)} aria-label="Next">›</button>
				</div>
			</div>
		</div>
	);
}
