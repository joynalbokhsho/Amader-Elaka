"use client";

import rulesData from '@/data/rules.json';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RulesPage() {
	return (
		<div className="container" style={{ padding: '64px 24px' }}>
			<motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<h1>{rulesData.title}</h1>
				<p>{rulesData.subtitle}</p>
			</motion.header>
			
			{/* Rules Categories */}
			<div style={{ marginTop: 32 }}>
				{rulesData.categories.map((category, categoryIndex) => (
					<motion.div 
						key={category.id}
						initial={{ opacity: 0, y: 20 }} 
						whileInView={{ opacity: 1, y: 0 }} 
						viewport={{ once: true }} 
						transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
						style={{ marginBottom: 40 }}
					>
						<div style={{ 
							display: 'flex', 
							alignItems: 'center', 
							gap: 12, 
							marginBottom: 16,
							padding: '12px 16px',
							background: 'rgba(255,255,255,0.04)',
							borderRadius: 12,
							border: '1px solid var(--border)'
						}}>
							<span style={{ fontSize: '24px' }}>{category.icon}</span>
							<div>
								<h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>{category.name}</h2>
								<p style={{ margin: '4px 0 0 0', opacity: 0.8, fontSize: '14px' }}>{category.description}</p>
							</div>
						</div>
						
						<div style={{ display: 'grid', gap: 12 }}>
							{rulesData.rules
								.filter(rule => rule.category === category.id)
								.map((rule, ruleIndex) => (
									<motion.div 
										key={rule.id}
										initial={{ opacity: 0, x: -8 }} 
										whileInView={{ opacity: 1, x: 0 }} 
										viewport={{ once: true }} 
										transition={{ duration: 0.35, delay: (categoryIndex * 0.1) + (ruleIndex * 0.05) }}
										style={{ 
											background: 'rgba(255,255,255,0.04)', 
											border: '1px solid var(--border)', 
											borderRadius: 12, 
											padding: '16px',
											borderLeft: `4px solid ${getSeverityColor(rule.severity)}`
										}}
									>
										<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
											<h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{rule.title}</h3>
											<span style={{ 
												padding: '2px 8px', 
												borderRadius: 6, 
												fontSize: '11px', 
												fontWeight: 600,
												background: getSeverityColor(rule.severity),
												color: 'white'
											}}>
												{rule.severity.toUpperCase()}
											</span>
										</div>
										<p style={{ margin: '0 0 8px 0', opacity: 0.9, fontSize: '14px', lineHeight: 1.5 }}>
											{rule.description}
										</p>
										<div style={{ 
											fontSize: '12px', 
											opacity: 0.7, 
											padding: '6px 10px', 
											background: 'rgba(255,255,255,0.03)', 
											borderRadius: 6 
										}}>
											<strong>Consequence:</strong> {rule.consequence}
										</div>
									</motion.div>
								))}
						</div>
					</motion.div>
				))}
			</div>
			
			{/* Footer Info */}
			<motion.div 
				initial={{ opacity: 0 }} 
				whileInView={{ opacity: 1 }} 
				viewport={{ once: true }} 
				transition={{ duration: 0.5, delay: 0.5 }}
				style={{ 
					marginTop: 40, 
					padding: '20px', 
					background: 'rgba(255,255,255,0.04)', 
					borderRadius: 12, 
					border: '1px solid var(--border)',
					textAlign: 'center'
				}}
			>
				<p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
					<strong>Last Updated:</strong> {rulesData.settings.lastUpdated} | <strong>Version:</strong> {rulesData.settings.version}
				</p>
				<p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
					{rulesData.settings.contactModerators}
				</p>
				<p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>
					{rulesData.settings.ruleChanges}
				</p>
			</motion.div>
			
			<div style={{ marginTop: 32, textAlign: 'center' }}>
				<Link className="secondaryCta" href="/">← Back home</Link>
			</div>
		</div>
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
