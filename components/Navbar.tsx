import Link from 'next/link';
import Image from 'next/image';
import site from '@/data/site.json';

export function Navbar() {
  return (
    <nav className="nav">
      <div className="container navInner">
        <Link className="brand" href="/">
          <Image src="/logo.svg" alt={site.name} width={28} height={28} className="brandLogo" />
          <span>{site.name}</span>
        </Link>
        <div className="navLinks">
          {site.nav.items.map((item) => (
            item.href.startsWith('/') ? (
              <Link key={item.label} className="navLink" href={item.href as any}>{item.label}</Link>
            ) : (
              <a key={item.label} className="navLink" href={item.href}>{item.label}</a>
            )
          ))}
        </div>
      </div>
    </nav>
  );
}


