import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Luci - AI Voice Assistant | Coming Soon',
  description: 'Hey Luci, bolo aur kaam ho jaaye. The AI voice assistant built for Windows with native support for Hindi, English & Hinglish.',
  icons: {
    icon: '/luci.png',
  },
  openGraph: {
    title: 'Luci - AI Voice Assistant',
    description: 'Hey Luci, bolo aur kaam ho jaaye. The AI voice assistant built for Windows.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-midnight text-white antialiased">
        {children}
      </body>
    </html>
  );
}
