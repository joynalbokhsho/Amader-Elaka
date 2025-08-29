"use client";

import Link from 'next/link';
import Image from 'next/image';
import site from '@/data/site.json';
import { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav">
      <div className="container navInner">
        <Link className="brand" href="/" onClick={closeMenu}>
          <Image src="/logo.svg" alt={site.name} width={0} height={32} className="brandLogo" style={{ width: 'auto', height: '32px' }} />
        </Link>
        
        <button className="mobileMenuBtn" onClick={toggleMenu} aria-label="Toggle menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
        
        <div className={`navLinks ${isMenuOpen ? 'open' : ''}`}>
          {site.nav.items.map((item) => (
            item.href.startsWith('/') ? (
              <Link key={item.label} className="navLink" href={item.href as any} onClick={closeMenu}>{item.label}</Link>
            ) : (
              <a key={item.label} className="navLink" href={item.href} onClick={closeMenu}>{item.label}</a>
            )
          ))}
        </div>
      </div>
    </nav>
  );
}


