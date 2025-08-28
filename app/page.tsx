"use client";

import Image from 'next/image';
import styles from './page.module.css';
import site from '@/data/site.json';
import { AnimateOnView } from '@/components/AnimateOnView';
import { Lightbox } from '@/components/Lightbox';
import { useState } from 'react';

export default function HomePage() {
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const galleryImages = (site.gallery.images.length ? site.gallery.images : Array.from({ length: 8 }).map((_, i) => `/api/placeholder/800/600?i=${i}`));

  return (
    <>
      <section className={styles.hero}>
        <AnimateOnView className={styles.heroContent}>
          <h1 className={styles.title}>{site.hero.title}</h1>
          <p className={styles.subtitle}>{site.hero.subtitle}</p>
          <div className={styles.ctaGroup}>
            <a href={site.hero.primaryCtaHref} className={styles.primaryCta}>{site.hero.primaryCtaLabel}</a>
            <a href={site.hero.secondaryCtaHref} className={styles.secondaryCta}>{site.hero.secondaryCtaLabel}</a>
          </div>
        </AnimateOnView>
        <div className={styles.heroArt}>
          <Image src="/logo.svg" alt={site.name} width={240} height={240} priority />
        </div>
      </section>

      <section id="about" className={styles.section}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2>{site.about.title}</h2>
            <p>{site.about.intro}</p>
          </header>
          <div className={styles.featureGrid}>
            {site.about.features.map((f) => (
              <AnimateOnView key={f.title} className={styles.card}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className={styles.sectionAlt}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2>{site.events.title}</h2>
            <p>{site.events.subtitle}</p>
          </header>
          <ul className={styles.timeline}>
            {site.events.list.map((e) => (
              <AnimateOnView key={e.title}>
                <li>
                  <span className={styles.badge}>{e.day}</span>
                  <div>
                    <h4>{e.title}</h4>
                    <p>{e.desc}</p>
                  </div>
                </li>
              </AnimateOnView>
            ))}
          </ul>
        </div>
      </section>

      <section id="games" className={styles.section}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2>{site.games.title}</h2>
            <p>{site.games.subtitle}</p>
          </header>
          <div className={styles.cardGrid}>
            {site.games.items.map((g) => (
              <AnimateOnView key={g} className={styles.gameCard}>{g}</AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      <section id="music" className={styles.sectionAlt}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2>{site.music.title}</h2>
            <p>{site.music.subtitle}</p>
          </header>
          <div className={styles.cardRow}>
            {site.music.items.map((m) => (
              <AnimateOnView key={m} className={styles.card}>{m}</AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      <section id="movies" className={styles.section}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2>{site.movies.title}</h2>
            <p>{site.movies.subtitle}</p>
          </header>
          <div className={styles.cardRow}>
            {site.movies.items.map((m) => (
              <AnimateOnView key={m} className={styles.card}>{m}</AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      <section id="football" className={styles.sectionAlt}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2>{site.football.title}</h2>
            <p>{site.football.subtitle}</p>
          </header>
          <div className={styles.cardRow}>
            {site.football.items.map((f) => (
              <AnimateOnView key={f} className={styles.card}>{f}</AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      <section id="rules" className={styles.section}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2>{site.rules.title}</h2>
            <p>{site.rules.subtitle}</p>
          </header>
          <ol className={styles.rules}>
            {site.rules.items.map((r) => (
              <AnimateOnView key={r}>
                <li>{r}</li>
              </AnimateOnView>
            ))}
          </ol>
        </div>
      </section>

      <section id="staff" className={styles.sectionAlt}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2>{site.staff.title}</h2>
            <p>{site.staff.subtitle}</p>
          </header>
          <div className={styles.staffGrid}>
            {site.staff.members.map((s) => (
              <AnimateOnView key={s.name} className={styles.staffCard}>
                <div className={styles.avatar} />
                <div>
                  <h4>{s.name}</h4>
                  <p className={styles.muted}>Timezone: {s.timezone}</p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className={styles.section}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2>{site.gallery.title}</h2>
            <p>{site.gallery.subtitle}</p>
          </header>
          <div className={styles.gallery}>
            {galleryImages.map((src, i) => (
              <AnimateOnView key={i}>
                <button
                  className={styles.galleryItem}
                  onClick={() => { setLbOpen(true); setLbIndex(i); }}
                  aria-label={`Open image ${i + 1}`}
                  style={{ width: '100%', height: '100%', cursor: 'zoom-in', backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className={styles.sectionAlt}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2>{site.testimonials.title}</h2>
            <p>{site.testimonials.subtitle}</p>
          </header>
          <div className={styles.quoteGrid}>
            {site.testimonials.items.map((q) => (
              <AnimateOnView key={q} className={styles.quote}>“{q}”</AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className={styles.section}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2>{site.faq.title}</h2>
            <p>{site.faq.subtitle}</p>
          </header>
          <div className={styles.faq}>
            {site.faq.items.map((item) => (
              <AnimateOnView key={item.q}>
                <details>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={styles.sectionAlt}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2>{site.contact.title}</h2>
            <p>{site.contact.subtitle}</p>
          </header>
          <div className={styles.contact}>
            <a className={styles.primaryCta} href={site.links.discordInvite}>{site.contact.primaryCtaLabel}</a>
            <a className={styles.secondaryCta} href={`mailto:${site.contact.email}`}>{site.contact.secondaryCtaLabel}</a>
          </div>
        </div>
      </section>

      {lbOpen && (
        <Lightbox images={galleryImages} initialIndex={lbIndex} onClose={() => setLbOpen(false)} />
      )}
    </>
  );
}


