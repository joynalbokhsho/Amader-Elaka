"use client";

import site from '@/data/site.json';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function EventsPage() {
	return (
		<div className="container" style={{ padding: '64px 24px' }}>
			<motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<h1>{site.events.title}</h1>
				<p>{site.events.subtitle}</p>
			</motion.header>
			<div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
				{site.events.list.map((e) => (
					<motion.div key={e.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
						style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 14, padding: 16, display: 'grid', gridTemplateColumns: '56px 1fr', gap: 12 }}>
						<span className="badge">{e.day}</span>
						<div>
							<h3 style={{ margin: 0 }}>{e.title}</h3>
							<p style={{ marginTop: 6 }}>{e.desc}</p>
						</div>
					</motion.div>
				))}
			</div>
			<div style={{ marginTop: 32 }}>
				<Link className="secondaryCta" href="/">← Back home</Link>
			</div>
		</div>
	);
}
