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
  title: 'Ishaan Gulati — Software Engineer',
  description:
    'Second-year CS student at the University of Sydney (Advanced Computing). Building fast, elegant software at the intersection of systems and product.',
  keywords: ['Ishaan Gulati', 'Software Engineer', 'University of Sydney', 'Computer Science', 'Portfolio'],
  authors: [{ name: 'Ishaan Gulati' }],
  openGraph: {
    title: 'Ishaan Gulati — Software Engineer',
    description: 'CS @ UoS · Builder · Dalyell Scholar',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ishaan Gulati — Software Engineer',
    description: 'CS @ UoS · Builder · Dalyell Scholar',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="font-dm-sans antialiased">{children}</body>
    </html>
  )
}
