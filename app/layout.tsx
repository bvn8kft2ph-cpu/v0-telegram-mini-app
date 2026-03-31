import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Heebo, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Cormorant Garamond — elegant serif for headings
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

// Heebo — Hebrew-optimized sans-serif for body
const heebo = Heebo({
  subsets: ['latin', 'hebrew'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
})

// Inter — clean sans-serif for numbers and technical text
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Freger Cosmetics — Digital Boutique',
  description: 'Профессиональная косметика. Telegram Mini App бутик Freger Cosmetics.',
  generator: 'v0.app',
  applicationName: 'Freger Cosmetics',
  keywords: ['cosmetics', 'skincare', 'beauty', 'telegram', 'mini app', 'косметика', 'קוסמטיקה'],
  authors: [{ name: 'Freger Cosmetics' }],
  creator: 'Freger Cosmetics',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Freger Cosmetics — Digital Boutique',
    description: 'Профессиональная косметика. Telegram Mini App бутик.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: 'he_IL',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFBF7' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0D0B' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="he" 
      dir="rtl" 
      data-theme="dark"
      suppressHydrationWarning
    >
      <body 
        className={`
          ${cormorant.variable} 
          ${heebo.variable} 
          ${inter.variable} 
          font-body antialiased
        `}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
