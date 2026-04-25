import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Ishaan Gulati — Advanced Computing @ USYD',
  description:
    'Dalyell Scholar · UG High Honour Roll · Hackathon Winner. Building fast, precise software at the intersection of systems and product.',
  keywords: [
    'Ishaan Gulati',
    'Software Engineer',
    'University of Sydney',
    'Advanced Computing',
    'Dalyell Scholar',
    'Computer Science',
    'Portfolio',
    'USYD',
  ],
  authors: [{ name: 'Ishaan Gulati' }],
  metadataBase: new URL('https://ishaangulati.dev'),
  openGraph: {
    title: 'Ishaan Gulati — Advanced Computing @ USYD',
    description: 'Dalyell Scholar · UG High Honour Roll · Hackathon Winner',
    type: 'website',
    url: 'https://ishaangulati.dev',
    siteName: 'Ishaan Gulati',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ishaan Gulati — Advanced Computing @ USYD',
    description: 'Dalyell Scholar · UG High Honour Roll · Hackathon Winner',
    creator: '@ishaangulati',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="font-dm-sans antialiased">{children}</body>
    </html>
  )
}
