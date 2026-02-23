import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Omega TV - Stream Everything',
  description: '10,000+ channels, movies, sports, and live TV. One subscription, any device.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {/* Referral Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-2 px-4 text-sm font-medium">
          🎁 <span className="font-bold">Refer a friend, get 6 months FREE!</span> They sign up for a year, you get half a year on us.
        </div>
        {children}
      </body>
    </html>
  )
}
