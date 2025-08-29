"use client";

import { useEffect, useState, useCallback } from 'react';

type LightboxProps = {
	images: string[];
	initialIndex: number;
	onClose: () => void;
};

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
	const [index, setIndex] = useState(initialIndex);
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [touchEnd, setTouchEnd] = useState<number | null>( null);
	
	const go = useCallback((dir: -1 | 1) => setIndex((i) => (i + dir + images.length) % images.length), [images.length]);

	// Minimum swipe distance (in px)
	const minSwipeDistance = 50;

	const onTouchStart = (e: React.TouchEvent) => {
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;

		if (isLeftSwipe) {
			go(1); // Next
		}
		if (isRightSwipe) {
			go(-1); // Previous
		}
	};

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
			<div 
				className="lbInner" 
				onClick={(e) => e.stopPropagation()}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				<img 
					className="lbImg" 
					src={images[index]} 
					alt={`Gallery item ${index + 1} of ${images.length}`}
					style={{ 
						maxWidth: '90vw', 
						maxHeight: '90vh',
						objectFit: 'contain'
					}}
				/>
				<div className="lbControls">
					<button 
						className="lbBtn" 
						onClick={() => go(-1)} 
						aria-label="Previous"
						style={{
							padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 14px)',
							fontSize: 'clamp(18px, 4vw, 24px)',
							minWidth: '44px',
							minHeight: '44px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						‹
					</button>
					<button 
						className="lbBtn" 
						onClick={() => go(1)} 
						aria-label="Next"
						style={{
							padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 14px)',
							fontSize: 'clamp(18px, 4vw, 24px)',
							minWidth: '44px',
							minHeight: '44px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						›
					</button>
				</div>
				{/* Image counter for mobile */}
				<div style={{
					position: 'absolute',
					bottom: '20px',
					left: '50%',
					transform: 'translateX(-50%)',
					background: 'rgba(0,0,0,0.7)',
					color: 'white',
					padding: '8px 16px',
					borderRadius: '20px',
					fontSize: 'clamp(12px, 3vw, 14px)',
					backdropFilter: 'blur(10px)'
				}}>
					{index + 1} / {images.length}
				</div>
			</div>
		</div>
	);
}
