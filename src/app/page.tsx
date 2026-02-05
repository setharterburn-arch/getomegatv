'use client'

import Link from 'next/link'
import { Logo } from '@/components/Logo'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <span className="text-lg font-bold tracking-tight">OMEGA TV</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <Link href="/support" className="nav-link">Support</Link>
            <Link href="/login" className="nav-link">Login</Link>
            <Link href="/signup" className="btn-primary">
              Get Started
            </Link>
          </nav>
          <Link href="/signup" className="md:hidden btn-primary text-sm px-4 py-2">
            Start
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="section text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
            STREAM<br />EVERYTHING.
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-10 animate-fade-in-up delay-100">
            10,000+ channels. Movies. Sports. Live TV.<br />
            One subscription. Any device.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
            <Link href="/signup" className="btn-primary">
              Start Watching
            </Link>
            <a href="#pricing" className="btn-secondary">
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider max-w-6xl mx-auto" />

      {/* Features */}
      <section id="features" className="section">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight">
            WHAT YOU GET
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📺</div>
              <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">Live TV</h3>
              <p className="text-gray-500">
                10,000+ channels including local networks, news, sports, and entertainment worldwide.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">On Demand</h3>
              <p className="text-gray-500">
                Thousands of movies and TV shows. New releases added daily.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏈</div>
              <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">Sports</h3>
              <p className="text-gray-500">
                NFL, NBA, MLB, NHL, UFC, soccer, and more. Never miss a game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider max-w-6xl mx-auto" />

      {/* Pricing */}
      <section id="pricing" className="section bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">
            SIMPLE PRICING
          </h2>
          <p className="text-gray-500 text-center mb-12">
            All plans include 3 simultaneous connections. No hidden fees.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* 1 Month */}
            <div className="card text-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">1 Month</h3>
              <p className="text-5xl font-bold mb-6">$20</p>
              <ul className="text-gray-500 text-sm space-y-2 mb-8">
                <li>3 connections</li>
                <li>All channels</li>
                <li>HD & 4K quality</li>
              </ul>
              <Link href="/signup" className="btn-secondary w-full block text-center">
                Select
              </Link>
            </div>

            {/* 6 Months - Featured */}
            <div className="card card-highlight text-center relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold uppercase tracking-widest px-4 py-1">
                Best Value
              </span>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">6 Months</h3>
              <p className="text-5xl font-bold mb-2">$90</p>
              <p className="text-green-600 text-sm font-semibold mb-4">Save $30</p>
              <ul className="text-gray-500 text-sm space-y-2 mb-8">
                <li>3 connections</li>
                <li>All channels</li>
                <li>HD & 4K quality</li>
              </ul>
              <Link href="/signup" className="btn-primary w-full block text-center">
                Select
              </Link>
            </div>

            {/* 12 Months */}
            <div className="card text-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">12 Months</h3>
              <p className="text-5xl font-bold mb-2">$150</p>
              <p className="text-green-600 text-sm font-semibold mb-4">Save $90</p>
              <ul className="text-gray-500 text-sm space-y-2 mb-8">
                <li>3 connections</li>
                <li>All channels</li>
                <li>HD & 4K quality</li>
              </ul>
              <Link href="/signup" className="btn-secondary w-full block text-center">
                Select
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Devices */}
      <section className="section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-tight">
            WORKS ON ALL DEVICES
          </h2>
          <div className="flex flex-wrap justify-center gap-12 text-gray-500">
            <div>
              <div className="text-4xl mb-2">📱</div>
              <p className="text-sm uppercase tracking-wide font-medium">Mobile</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🔥</div>
              <p className="text-sm uppercase tracking-wide font-medium">Firestick</p>
            </div>
            <div>
              <div className="text-4xl mb-2">📺</div>
              <p className="text-sm uppercase tracking-wide font-medium">Smart TV</p>
            </div>
            <div>
              <div className="text-4xl mb-2">💻</div>
              <p className="text-sm uppercase tracking-wide font-medium">Browser</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🎮</div>
              <p className="text-sm uppercase tracking-wide font-medium">Android Box</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-black text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            READY TO START?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of happy customers streaming their favorite content.
          </p>
          <Link 
            href="/signup" 
            className="inline-block bg-white text-black px-8 py-4 font-semibold uppercase tracking-wide text-sm hover:bg-gray-200 transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Logo className="w-5 h-5" />
            <span className="text-sm font-medium">Omega TV</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/login" className="hover:text-black transition-colors">Login</Link>
            <Link href="/signup" className="hover:text-black transition-colors">Sign Up</Link>
            <Link href="/support" className="hover:text-black transition-colors">Support</Link>
          </div>
          <p className="text-sm text-gray-400">© 2026 Omega TV</p>
        </div>
      </footer>
    </div>
  )
}
