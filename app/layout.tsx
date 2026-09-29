import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Daffa Fadhul Rahman — Portfolio',
  description: 'SIJA student at SMKN 2 Yogyakarta specializing in network infrastructure, full-stack development, and IoT engineering.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f7f5',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
