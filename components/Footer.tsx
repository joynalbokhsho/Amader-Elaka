import site from '@/data/site.json';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footerInner">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <a id="join" className="discordBtn" href={site.links.discordInvite} target="_blank" rel="noreferrer">
          Join on Discord
        </a>
      </div>
    </footer>
  );
}


