"use client";

import Image from 'next/image';
import styles from './page.module.css';
import site from '@/data/site.json';
import eventsData from '@/data/events.json';
import { AnimateOnView } from '@/components/AnimateOnView';
import { Lightbox } from '@/components/Lightbox';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const galleryImages = (site.gallery.images.length ? site.gallery.images : Array.from({ length: 8 }).map((_, i) => `/api/placeholder/800/600?i=${i}`));

  // Prevent scroll bars during loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={isLoading ? styles.loading : ''}>
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
          <Image 
            src="/AmaderElakaPng.png" 
            alt={site.name} 
            width={400} 
            height={400} 
            className={styles.heroLogo} 
            style={{ 
              width: 'auto', 
              height: '300px',
              maxWidth: '100%',
              objectFit: 'contain'
            }} 
            priority 
          />
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
            <h2>{eventsData.title}</h2>
            <p>{eventsData.subtitle}</p>
          </header>
          
          {/* All Events */}
          <div className={styles.allEvents}>
            <h3>All Events</h3>
            <div className={styles.eventGrid}>
              {eventsData.events
                .filter(event => event.status === 'active')
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((event) => (
                  <AnimateOnView key={event.id} className={styles.eventCard}>
                    <div className={styles.eventHeader}>
                      <h4>{event.title}</h4>
                      <span className={styles.eventDate}>{new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <p className={styles.eventDescription}>{event.description}</p>
                    <div className={styles.eventDetails}>
                      <span className={styles.eventTime}>🕐 {event.time}</span>
                      <span className={styles.eventHost}>👤 {event.host}</span>
                      <span className={styles.eventCapacity}>👥 {typeof event.maxParticipants === "string" ? "∞" : `${event.maxParticipants} max`}</span>
                    </div>
                    {event.requirements && (
                      <div className={styles.eventRequirements}>
                        <strong>Requirements:</strong> {event.requirements}
                      </div>
                    )}
                    {event.games && (
                      <div className={styles.eventGames}>
                        <strong>Games:</strong> {event.games.join(', ')}
                      </div>
                    )}
                    {event.genres && (
                      <div className={styles.eventGenres}>
                        <strong>Genres:</strong> {event.genres.join(', ')}
                      </div>
                    )}
                    {event.leagues && (
                      <div className={styles.eventLeagues}>
                        <strong>Leagues:</strong> {event.leagues.join(', ')}
                      </div>
                    )}
                    {event.prizes && (
                      <div className={styles.eventPrizes}>
                        <strong>Prizes:</strong> {event.prizes}
                      </div>
                    )}
                  </AnimateOnView>
                ))}
            </div>
          </div>

          {/* Upcoming Events */}
          {eventsData.upcoming.length > 0 && (
            <div className={styles.upcomingEvents}>
              <h3>Upcoming Events</h3>
              <div className={styles.upcomingGrid}>
                {eventsData.upcoming.map((upcoming) => {
                  const event = eventsData.events.find(e => e.id === upcoming.eventId);
                  if (!event) return null;
                  
                  return (
                    <AnimateOnView key={upcoming.id} className={styles.upcomingCard}>
                      <div className={styles.upcomingHeader}>
                        <h4>{event.title}</h4>
                        <span className={styles.upcomingDate}>{new Date(upcoming.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                      <p>{event.description}</p>
                      <div className={styles.upcomingDetails}>
                        <span>🕐 {upcoming.time}</span>
                        <span>👥 {upcoming.participants}/{typeof upcoming.maxParticipants === "string" ? "∞" : upcoming.maxParticipants}</span>
                        <span className={styles.upcomingStatus}>{upcoming.status}</span>
                      </div>
                      {upcoming.movie && (
                        <div className={styles.upcomingMovie}>
                          <strong>Movie:</strong> {upcoming.movie}
                        </div>
                      )}
                    </AnimateOnView>
                  );
                })}
              </div>
            </div>
          )}
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

      <section id="sports" className={styles.sectionAlt}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2>{site.sports.title}</h2>
            <p>{site.sports.subtitle}</p>
          </header>
          <div className={styles.cardRow}>
            {site.sports.items.map((f) => (
              <AnimateOnView key={f} className={styles.card}>{f}</AnimateOnView>
            ))}
          </div>
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

      <section id="faq" className={styles.section}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2>{site.faq.title}</h2>
            <p>{site.faq.subtitle}</p>
          </header>
          <div className={styles.faqContainer}>
            {site.faq.items.map((item, index) => (
              <AnimateOnView key={item.q} className={styles.faqItem}>
                <details className={styles.faqDetails}>
                  <summary className={styles.faqSummary}>
                    <span className={styles.faqQuestion}>{item.q}</span>
                    <span className={styles.faqIcon}>+</span>
                  </summary>
                  <div className={styles.faqAnswer}>
                    <p>{item.a}</p>
                  </div>
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
    </div>
  );
}




