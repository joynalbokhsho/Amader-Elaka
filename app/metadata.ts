import type { Metadata } from 'next';

const siteUrl = 'https://amader-elaka.example.com';

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Amader Elaka — Discord Community',
    template: '%s | Amader Elaka'
  },
  description: 'Bangladesh community server: games, music, movies, football. Join us on Discord!',
  applicationName: 'Amader Elaka',
  themeColor: '#5865F2',
  icons: {
    icon: '/logo.svg'
  },
  openGraph: {
    title: 'Amader Elaka — Discord Community',
    description: 'Bangladesh community server: games, music, movies, football. Join us on Discord!',
    url: siteUrl,
    siteName: 'Amader Elaka',
    images: ['/logo.svg'],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amader Elaka — Discord Community',
    description: 'Bangladesh community server: games, music, movies, football. Join us on Discord!',
    images: ['/logo.svg']
  },
  manifest: '/manifest.webmanifest'
};


