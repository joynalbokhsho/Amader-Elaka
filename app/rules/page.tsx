"use client";

import rulesData from '@/data/rules.json';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '../page.module.css';

export default function RulesPage() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1
			}
		}
	};

	const headerVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: { opacity: 1, y: 0 }
	};

	const categoryVariants = {
		hidden: { opacity: 0, x: -30 },
		visible: { opacity: 1, x: 0 }
	};

	const ruleVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: { opacity: 1, scale: 1 },
		hover: { scale: 1.02 }
	};

	const footerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 }
	};

	return (
		<motion.div 
			className="container" 
			style={{ padding: '64px 24px' }}
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			transition={{ duration: 0.6, staggerChildren: 0.1 }}
		>
			<motion.header 
				variants={headerVariants}
				style={{ marginBottom: '32px' }}
				transition={{ duration: 0.8 }}
			>
				<motion.h1 
					style={{ 
						fontSize: 'clamp(2rem, 5vw, 3rem)', 
						margin: '0 0 16px 0',
						background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
						WebkitBackgroundClip: 'text',
						backgroundClip: 'text',
						color: 'transparent'
					}}
					whileHover={{ scale: 1.02 }}
					transition={{ duration: 0.2 }}
				>
					{rulesData.title}
				</motion.h1>
				<motion.p 
					style={{ 
						fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
						margin: 0,
						opacity: 0.9,
						lineHeight: 1.5
					}}
					whileHover={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
				>
					{rulesData.subtitle}
				</motion.p>
			</motion.header>
			
			{/* Rules Categories */}
			<motion.div 
				style={{ marginTop: 32 }}
				variants={containerVariants}
				transition={{ duration: 0.6, staggerChildren: 0.1 }}
			>
				{rulesData.categories.map((category, categoryIndex) => (
					<motion.div 
						key={category.id}
						variants={categoryVariants}
						style={{ marginBottom: 40 }}
						transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
						whileHover={{ 
							scale: 1.01,
							transition: { duration: 0.2 }
						}}
					>
						<motion.div 
							style={{ 
								display: 'flex', 
								alignItems: 'center', 
								gap: 12, 
								marginBottom: 16,
								padding: 'clamp(12px, 3vw, 16px)',
								background: 'rgba(255,255,255,0.04)',
								borderRadius: 12,
								border: '1px solid var(--border)',
								flexWrap: 'wrap'
							}}
							whileHover={{ 
								background: 'rgba(255,255,255,0.08)',
								borderColor: 'var(--accent)',
								transition: { duration: 0.3 }
							}}
						>
							<motion.span 
								style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}
								whileHover={{ 
									rotate: 360,
									scale: 1.2,
									transition: { duration: 0.5 }
								}}
							>
								{category.icon}
							</motion.span>
							<div style={{ flex: 1, minWidth: '200px' }}>
								<motion.h2 
									style={{ 
										margin: 0, 
										fontSize: 'clamp(16px, 4vw, 20px)', 
										fontWeight: 700 
									}}
									whileHover={{ color: 'var(--accent)' }}
									transition={{ duration: 0.2 }}
								>
									{category.name}
								</motion.h2>
								<motion.p 
									style={{ 
										margin: '4px 0 0 0', 
										opacity: 0.8, 
										fontSize: 'clamp(12px, 3vw, 14px)',
										lineHeight: 1.4
									}}
									whileHover={{ opacity: 1 }}
									transition={{ duration: 0.2 }}
								>
									{category.description}
								</motion.p>
							</div>
						</motion.div>
						
						<motion.div 
							style={{ display: 'grid', gap: 12 }}
							variants={containerVariants}
							transition={{ duration: 0.4, staggerChildren: 0.05 }}
						>
							{rulesData.rules
								.filter(rule => rule.category === category.id)
								.map((rule, ruleIndex) => (
									<motion.div 
										key={rule.id}
										variants={ruleVariants}
										style={{ 
											background: 'rgba(255,255,255,0.04)', 
											border: '1px solid var(--border)', 
											borderRadius: 12, 
											padding: 'clamp(12px, 3vw, 16px)',
											borderLeft: `4px solid ${getSeverityColor(rule.severity)}`,
											cursor: 'pointer'
										}}
										transition={{ duration: 0.4, delay: ruleIndex * 0.05 }}
										whileHover={{ 
											scale: 1.02,
											background: 'rgba(255,255,255,0.08)',
											borderColor: getSeverityColor(rule.severity),
											boxShadow: `0 8px 25px rgba(0,0,0,0.2), 0 0 15px ${getSeverityColor(rule.severity)}20`,
											transition: { duration: 0.3 }
										}}
									>
										<motion.div 
											style={{ 
												display: 'flex', 
												justifyContent: 'space-between', 
												alignItems: 'flex-start', 
												marginBottom: 8,
												flexWrap: 'wrap',
												gap: 8
											}}
											whileHover={{ x: 5 }}
											transition={{ duration: 0.2 }}
										>
											<motion.h3 
												style={{ 
													margin: 0, 
													fontSize: 'clamp(14px, 3vw, 16px)', 
													fontWeight: 600,
													flex: 1,
													minWidth: '200px'
												}}
												whileHover={{ color: getSeverityColor(rule.severity) }}
												transition={{ duration: 0.2 }}
											>
												{rule.title}
											</motion.h3>
											<motion.span 
												style={{ 
													padding: '2px 8px', 
													borderRadius: 6, 
													fontSize: 'clamp(10px, 2.5vw, 11px)', 
													fontWeight: 600,
													background: getSeverityColor(rule.severity),
													color: 'white',
													whiteSpace: 'nowrap'
												}}
												whileHover={{ 
													scale: 1.1,
													rotate: 5,
													transition: { duration: 0.2 }
												}}
											>
												{rule.severity.toUpperCase()}
											</motion.span>
										</motion.div>
										<motion.p 
											style={{ 
												margin: '0 0 8px 0', 
												opacity: 0.9, 
												fontSize: 'clamp(12px, 3vw, 14px)', 
												lineHeight: 1.5 
											}}
											whileHover={{ opacity: 1 }}
											transition={{ duration: 0.2 }}
										>
											{rule.description}
										</motion.p>
										<motion.div 
											style={{ 
												fontSize: 'clamp(11px, 2.5vw, 12px)', 
												opacity: 0.7, 
												padding: '6px 10px', 
												background: 'rgba(255,255,255,0.03)', 
												borderRadius: 6 
											}}
											whileHover={{ 
												background: 'rgba(255,255,255,0.06)',
												scale: 1.02,
												transition: { duration: 0.2 }
											}}
										>
											<strong>Consequence:</strong> {rule.consequence}
										</motion.div>
									</motion.div>
								))}
						</motion.div>
					</motion.div>
				))}
			</motion.div>
			
			{/* Footer Info */}
			<motion.div 
				variants={footerVariants}
				style={{ 
					marginTop: 40, 
					padding: 'clamp(16px, 4vw, 20px)', 
					background: 'rgba(255,255,255,0.04)', 
					borderRadius: 12, 
					border: '1px solid var(--border)',
					textAlign: 'center'
				}}
				transition={{ duration: 0.6, delay: 0.3 }}
				whileHover={{ 
					background: 'rgba(255,255,255,0.08)',
					borderColor: 'var(--accent)',
					scale: 1.01,
					transition: { duration: 0.3 }
				}}
			>
				<motion.p 
					style={{ 
						margin: '0 0 8px 0', 
						fontSize: 'clamp(12px, 3vw, 14px)',
						lineHeight: 1.4
					}}
					whileHover={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
				>
					<strong>Last Updated:</strong> {rulesData.settings.lastUpdated} | <strong>Version:</strong> {rulesData.settings.version}
				</motion.p>
				<motion.p 
					style={{ 
						margin: '0 0 8px 0', 
						fontSize: 'clamp(12px, 3vw, 14px)',
						lineHeight: 1.4
					}}
					whileHover={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
				>
					{rulesData.settings.contactModerators}
				</motion.p>
				<motion.p 
					style={{ 
						margin: 0, 
						fontSize: 'clamp(10px, 2.5vw, 12px)', 
						opacity: 0.7,
						lineHeight: 1.4
					}}
					whileHover={{ opacity: 0.9 }}
					transition={{ duration: 0.2 }}
				>
					{rulesData.settings.ruleChanges}
				</motion.p>
			</motion.div>
			
			<motion.div 
				style={{ marginTop: 32, textAlign: 'center' }}
				variants={footerVariants}
				transition={{ duration: 0.6, delay: 0.4 }}
			>
				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					transition={{ duration: 0.2 }}
				>
					<Link 
						className="secondaryCta" 
						href="/"
						style={{
							display: 'inline-block',
							padding: 'clamp(10px, 2.5vw, 12px) clamp(16px, 4vw, 18px)',
							fontSize: 'clamp(14px, 3vw, 16px)',
							position: 'relative',
							overflow: 'hidden'
						}}
					>
						<motion.span
							style={{ position: 'relative', zIndex: 1 }}
							whileHover={{ color: 'white' }}
							transition={{ duration: 0.2 }}
						>
							← Back home
						</motion.span>
						<motion.div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
								borderRadius: 'inherit',
								zIndex: 0
							}}
							initial={{ scaleX: 0 }}
							whileHover={{ scaleX: 1 }}
							transition={{ duration: 0.3, ease: "easeOut" }}
						/>
					</Link>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}

function getSeverityColor(severity: string): string {
	switch (severity) {
		case 'high':
			return '#f04747'; // Red
		case 'medium':
			return '#faa61a'; // Orange
		case 'low':
			return '#43b581'; // Green
		case 'info':
			return '#5865f2'; // Blue
		default:
			return '#99aab5'; // Gray
	}
}
