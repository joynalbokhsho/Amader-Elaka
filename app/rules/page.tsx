"use client";

import site from '@/data/site.json';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RulesPage() {
	return (
		<div className="container" style={{ padding: '64px 24px' }}>
			<motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<h1>{site.rules.title}</h1>
				<p>{site.rules.subtitle}</p>
			</motion.header>
			<ol style={{ marginTop: 16, display: 'grid', gap: 8 }}>
				{site.rules.items.map((r, idx) => (
					<motion.li key={r} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: idx * 0.05 }}
						style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 14px' }}>
						{r}
					</motion.li>
				))}
			</ol>
			<div style={{ marginTop: 32 }}>
				<Link className="secondaryCta" href="/">← Back home</Link>
			</div>
		</div>
	);
}
