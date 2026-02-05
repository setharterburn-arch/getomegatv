import Link from 'next/link'
import { Logo } from '@/components/Logo'

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <span className="text-lg font-bold tracking-tight">OMEGA TV</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-8"></div>

        {/* Status Card Skeleton */}
        <div className="border border-gray-200 p-8 mb-8">
          <div className="h-16 bg-gray-100 animate-pulse rounded mb-6"></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="h-3 w-16 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div>
              <div className="h-3 w-16 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>

        {/* Quick Links Skeleton */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 p-6">
            <div className="h-5 w-24 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-100 animate-pulse rounded"></div>
          </div>
          <div className="border border-gray-200 p-6">
            <div className="h-5 w-24 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-100 animate-pulse rounded"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
