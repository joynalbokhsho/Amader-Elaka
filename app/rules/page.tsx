"use client";

import rulesData from '@/data/rules.json';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function RulesPage() {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 }
	};

	const headerVariants = {
		hidden: { opacity: 0, y: -30 },
		visible: { opacity: 1, y: 0 }
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 }
	};

	const filterVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: { opacity: 1, scale: 1 }
	};

	const statsVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: { opacity: 1, scale: 1 }
	};

	// Calculate statistics
	const totalRules = rulesData.rules.length;
	const highSeverityRules = rulesData.rules.filter(rule => rule.severity === 'high').length;
	const mediumSeverityRules = rulesData.rules.filter(rule => rule.severity === 'medium').length;
	const lowSeverityRules = rulesData.rules.filter(rule => rule.severity === 'low').length;

	// Filter rules based on selected category
	const filteredRules = selectedCategory 
		? rulesData.rules.filter(rule => rule.category === selectedCategory)
		: rulesData.rules;

	return (
		<motion.div 
			className="container" 
			style={{ padding: '40px 24px 80px' }}
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			transition={{ duration: 0.6 }}
		>
			{/* Hero Header */}
			<motion.header 
				variants={headerVariants}
				transition={{ duration: 0.8 }}
				style={{ 
					textAlign: 'center', 
					marginBottom: '60px',
					position: 'relative'
				}}
			>
				
				<motion.h1 
					style={{ 
						fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
						margin: '50px 0 16px 0',
						background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
						WebkitBackgroundClip: 'text',
						backgroundClip: 'text',
						color: 'transparent',
						fontWeight: 900,
						letterSpacing: '-0.02em',
						lineHeight: 1.2,
						wordWrap: 'break-word',
						overflowWrap: 'break-word',
						maxWidth: '100%'
					}}
					whileHover={{ scale: 1.02 }}
					transition={{ duration: 0.2 }}
				>
					{rulesData.title}
				</motion.h1>
				
				<motion.p 
					style={{ 
						fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
						margin: '0 0 24px 0',
						opacity: 0.9,
						lineHeight: 1.6,
						maxWidth: '600px',
						marginLeft: 'auto',
						marginRight: 'auto',
						wordWrap: 'break-word',
						overflowWrap: 'break-word'
					}}
					whileHover={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
				>
					{rulesData.subtitle}
				</motion.p>

				{/* Statistics Cards */}
				<motion.div 
					variants={statsVariants}
					transition={{ duration: 0.6, delay: 0.2 }}
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
						gap: '12px',
						maxWidth: '500px',
						margin: '0 auto'
					}}
				>
					{[
						{ label: 'Total Rules', value: totalRules, color: 'var(--accent)' },
						{ label: 'High Priority', value: highSeverityRules, color: 'var(--danger)' },
						{ label: 'Medium Priority', value: mediumSeverityRules, color: 'var(--warning)' },
						{ label: 'Low Priority', value: lowSeverityRules, color: 'var(--success)' }
					].map((stat, index) => (
						<motion.div
							key={stat.label}
							style={{
								background: 'rgba(255,255,255,0.05)',
								border: '1px solid var(--border)',
								borderRadius: '12px',
								padding: '12px 8px',
								textAlign: 'center',
								backdropFilter: 'blur(10px)',
								minHeight: '80px',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center'
							}}
							whileHover={{ 
								scale: 1.05,
								background: 'rgba(255,255,255,0.08)',
								transition: { duration: 0.2 }
							}}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
						>
							<div style={{ 
								fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', 
								fontWeight: 900,
								color: stat.color,
								marginBottom: '4px',
								lineHeight: 1
							}}>
								{stat.value}
							</div>
							<div style={{ 
								fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)', 
								opacity: 0.8,
								fontWeight: 500,
								lineHeight: 1.2,
								wordWrap: 'break-word',
								overflowWrap: 'break-word'
							}}>
								{stat.label}
							</div>
						</motion.div>
					))}
				</motion.div>
			</motion.header>

			{/* Category Filter */}
			<motion.div 
				variants={filterVariants}
				transition={{ duration: 0.6, delay: 0.4 }}
				style={{ 
					marginBottom: '40px',
					display: 'flex',
					flexWrap: 'wrap',
					gap: '8px',
					justifyContent: 'center'
				}}
			>
				<motion.button
					onClick={() => setSelectedCategory(null)}
					style={{
						padding: '8px 16px',
						borderRadius: '20px',
						border: '1px solid var(--border)',
						background: selectedCategory === null 
							? 'linear-gradient(135deg, var(--accent), var(--accent-2))' 
							: 'rgba(255,255,255,0.05)',
						color: selectedCategory === null ? 'white' : 'var(--foreground)',
						fontWeight: 600,
						fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
						cursor: 'pointer',
						transition: 'all 0.2s ease',
						whiteSpace: 'nowrap',
						minHeight: '36px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					All Rules
				</motion.button>
				
				{rulesData.categories.map((category) => (
					<motion.button
						key={category.id}
						onClick={() => setSelectedCategory(category.id)}
						style={{
							padding: '8px 16px',
							borderRadius: '20px',
							border: '1px solid var(--border)',
							background: selectedCategory === category.id 
								? 'linear-gradient(135deg, var(--accent), var(--accent-2))' 
								: 'rgba(255,255,255,0.05)',
							color: selectedCategory === category.id ? 'white' : 'var(--foreground)',
							fontWeight: 600,
							fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
							cursor: 'pointer',
							transition: 'all 0.2s ease',
							display: 'flex',
							alignItems: 'center',
							gap: '6px',
							whiteSpace: 'nowrap',
							minHeight: '36px',
							maxWidth: '200px',
							overflow: 'hidden',
							textOverflow: 'ellipsis'
						}}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<span style={{ fontSize: '1em', flexShrink: 0 }}>{category.icon}</span>
						<span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{category.name}</span>
					</motion.button>
				))}
			</motion.div>

			{/* Rules Grid */}
			<motion.div 
				variants={cardVariants}
				transition={{ duration: 0.6, delay: 0.6 }}
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
					gap: '20px',
					marginBottom: '60px'
				}}
			>
				{filteredRules.map((rule, index) => {
					const category = rulesData.categories.find(cat => cat.id === rule.category);
					return (
						<motion.div
							key={rule.id}
							style={{
								background: 'rgba(255,255,255,0.03)',
								border: '1px solid var(--border)',
								borderRadius: '16px',
								padding: '20px',
								position: 'relative',
								overflow: 'hidden',
								backdropFilter: 'blur(10px)',
								borderLeft: `4px solid ${getSeverityColor(rule.severity)}`,
								minHeight: '200px',
								display: 'flex',
								flexDirection: 'column'
							}}
							whileHover={{ 
								scale: 1.02,
								background: 'rgba(255,255,255,0.06)',
								boxShadow: `0 12px 40px rgba(0,0,0,0.3), 0 0 20px ${getSeverityColor(rule.severity)}20`,
								transition: { duration: 0.3 }
							}}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
						>
							{/* Category Badge */}
							<motion.div
								style={{
									position: 'absolute',
									top: '12px',
									right: '12px',
									padding: '4px 8px',
									borderRadius: '12px',
									background: 'rgba(255,255,255,0.1)',
									fontSize: '0.7rem',
									fontWeight: 600,
									opacity: 0.8,
									display: 'flex',
									alignItems: 'center',
									gap: '4px',
									maxWidth: '120px',
									overflow: 'hidden'
								}}
								whileHover={{ opacity: 1, scale: 1.05 }}
								transition={{ duration: 0.2 }}
							>
								<span style={{ fontSize: '0.8em', flexShrink: 0 }}>{category?.icon}</span>
								<span style={{ 
									overflow: 'hidden', 
									textOverflow: 'ellipsis', 
									whiteSpace: 'nowrap',
									fontSize: '0.8em'
								}}>
									{category?.name}
								</span>
							</motion.div>

							{/* Severity Badge */}
							<motion.div
								style={{
									position: 'absolute',
									top: '12px',
									left: '12px',
									padding: '4px 8px',
									borderRadius: '12px',
									background: getSeverityColor(rule.severity),
									color: 'white',
									fontSize: '0.65rem',
									fontWeight: 700,
									textTransform: 'uppercase',
									letterSpacing: '0.5px',
									maxWidth: '80px',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap'
								}}
								whileHover={{ 
									scale: 1.1,
									rotate: 5,
									transition: { duration: 0.2 }
								}}
							>
								{rule.severity}
							</motion.div>

							{/* Rule Content */}
							<div style={{ marginTop: '50px', flex: 1, display: 'flex', flexDirection: 'column' }}>
								<motion.h3 
									style={{ 
										fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', 
										fontWeight: 700,
										margin: '0 0 12px 0',
										lineHeight: 1.4,
										color: 'var(--foreground)',
										wordWrap: 'break-word',
										overflowWrap: 'break-word'
									}}
									whileHover={{ color: getSeverityColor(rule.severity) }}
									transition={{ duration: 0.2 }}
								>
									{rule.title}
								</motion.h3>
								
								<motion.p 
									style={{ 
										fontSize: 'clamp(0.85rem, 2vw, 0.9rem)', 
										lineHeight: 1.5,
										opacity: 0.9,
										margin: '0 0 16px 0',
										flex: 1,
										wordWrap: 'break-word',
										overflowWrap: 'break-word'
									}}
									whileHover={{ opacity: 1 }}
									transition={{ duration: 0.2 }}
								>
									{rule.description}
								</motion.p>

								{/* Consequence */}
								<motion.div 
									style={{
										background: 'rgba(255,255,255,0.05)',
										border: '1px solid rgba(255,255,255,0.1)',
										borderRadius: '8px',
										padding: '10px 12px',
										marginTop: 'auto'
									}}
									whileHover={{ 
										background: 'rgba(255,255,255,0.08)',
										scale: 1.02,
										transition: { duration: 0.2 }
									}}
								>
									<div style={{ 
										fontSize: '0.7rem', 
										fontWeight: 600,
										color: 'var(--accent)',
										marginBottom: '4px',
										textTransform: 'uppercase',
										letterSpacing: '0.5px'
									}}>
										Consequence
									</div>
									<div style={{ 
										fontSize: 'clamp(0.8rem, 2vw, 0.85rem)', 
										opacity: 0.9,
										lineHeight: 1.4,
										wordWrap: 'break-word',
										overflowWrap: 'break-word'
									}}>
										{rule.consequence}
									</div>
								</motion.div>
							</div>
						</motion.div>
					);
				})}
			</motion.div>

			{/* Footer Info */}
			<motion.div 
				variants={cardVariants}
				transition={{ duration: 0.6, delay: 0.8 }}
				style={{ 
					background: 'rgba(255,255,255,0.03)', 
					border: '1px solid var(--border)', 
					borderRadius: '20px', 
					padding: 'clamp(20px, 4vw, 28px)',
					textAlign: 'center',
					backdropFilter: 'blur(10px)',
					position: 'relative',
					overflow: 'hidden'
				}}
				whileHover={{ 
					background: 'rgba(255,255,255,0.06)',
					scale: 1.01,
					transition: { duration: 0.3 }
				}}
			>
				{/* Background Pattern */}
				<div style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'radial-gradient(circle at 20% 80%, rgba(123,97,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(14,165,234,0.1) 0%, transparent 50%)',
					opacity: 0.5
				}} />
				
				<div style={{ position: 'relative', zIndex: 1 }}>
					<motion.div
						style={{
							width: '50px',
							height: '50px',
							background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
							borderRadius: '50%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '20px',
							margin: '0 auto 16px',
							boxShadow: '0 8px 32px rgba(123, 97, 255, 0.3)'
						}}
						whileHover={{ 
							scale: 1.1, 
							rotate: 360,
							transition: { duration: 0.5 }
						}}
					>
						ℹ️
					</motion.div>
					
					<motion.div 
						style={{ 
							fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', 
							marginBottom: '10px',
							fontWeight: 600,
							wordWrap: 'break-word',
							overflowWrap: 'break-word'
						}}
						whileHover={{ opacity: 1 }}
						transition={{ duration: 0.2 }}
					>
						<strong>Last Updated:</strong> {rulesData.settings.lastUpdated} | <strong>Version:</strong> {rulesData.settings.version}
					</motion.div>
					
					<motion.div 
						style={{ 
							fontSize: 'clamp(0.85rem, 2.2vw, 0.9rem)', 
							marginBottom: '10px',
							opacity: 0.9,
							lineHeight: 1.5,
							wordWrap: 'break-word',
							overflowWrap: 'break-word'
						}}
						whileHover={{ opacity: 1 }}
						transition={{ duration: 0.2 }}
					>
						{rulesData.settings.contactModerators}
					</motion.div>
					
					<motion.div 
						style={{ 
							fontSize: 'clamp(0.75rem, 2vw, 0.8rem)', 
							opacity: 0.7,
							lineHeight: 1.5,
							wordWrap: 'break-word',
							overflowWrap: 'break-word'
						}}
						whileHover={{ opacity: 0.9 }}
						transition={{ duration: 0.2 }}
					>
						{rulesData.settings.ruleChanges}
					</motion.div>
				</div>
			</motion.div>

			{/* Back Button */}
			<motion.div 
				style={{ 
					marginTop: '40px', 
					textAlign: 'center' 
				}}
				variants={cardVariants}
				transition={{ duration: 0.6, delay: 1.0 }}
			>
				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					transition={{ duration: 0.2 }}
				>
					<Link 
						href="/"
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: '10px',
							padding: 'clamp(10px, 2.5vw, 14px) clamp(20px, 4vw, 28px)',
							fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
							fontWeight: 600,
							background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
							color: 'white',
							borderRadius: '50px',
							textDecoration: 'none',
							boxShadow: '0 8px 32px rgba(123, 97, 255, 0.3)',
							position: 'relative',
							overflow: 'hidden',
							whiteSpace: 'nowrap'
						}}
					>
						<motion.span
							style={{ fontSize: '1.1em' }}
							whileHover={{ x: -3 }}
							transition={{ duration: 0.2 }}
						>
							←
						</motion.span>
						Back to Home
						<motion.div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								background: 'rgba(255,255,255,0.1)',
								borderRadius: 'inherit'
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
