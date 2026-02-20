import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MultiVendor - Multi-vendor E-commerce Platform',
  description: 'Discover amazing products from multiple vendors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}

