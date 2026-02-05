'use client'

import Link from 'next/link'
import { MessageCircle, PlayCircle } from 'lucide-react'
import { Logo } from '@/components/Logo'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="text-xl font-bold">Omega TV</span>
          </Link>
          <nav className="flex items-center gap-6">
            <a href="#pricing" className="text-zinc-400 hover:text-white text-sm">Pricing</a>
            <a href="#support" className="text-zinc-400 hover:text-white text-sm">Support</a>
            <Link href="/login" className="text-zinc-400 hover:text-white text-sm">Login</Link>
            <Link href="/signup" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero - Simple */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Live TV. Movies. Sports.<br />One subscription.
        </h1>
        <p className="text-xl text-zinc-400 mb-8 max-w-xl mx-auto">
          10,000+ channels, on-demand content, and live sports. 
          Works on Firestick, Android, iOS, and smart TVs.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup" className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-semibold">
            Start Watching
          </Link>
          <a href="#pricing" className="border border-zinc-700 hover:border-zinc-500 px-8 py-3 rounded-lg font-semibold">
            View Pricing
          </a>
        </div>
      </section>

      {/* What You Get */}
      <section className="border-t border-zinc-800 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">What's Included</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="font-semibold mb-2">📺 Live TV</h3>
              <p className="text-zinc-400 text-sm">10,000+ channels including local networks, news, sports, and entertainment from around the world.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="font-semibold mb-2">🎬 Movies & Shows</h3>
              <p className="text-zinc-400 text-sm">Thousands of on-demand movies and TV series. New releases added regularly.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="font-semibold mb-2">🏈 Sports</h3>
              <p className="text-zinc-400 text-sm">NFL, NBA, MLB, NHL, UFC, soccer, and more. Never miss a game.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-zinc-800 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-2 text-center">Simple Pricing</h2>
          <p className="text-zinc-400 text-center mb-8">All plans include 3 connections. No hidden fees.</p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
              <h3 className="font-semibold mb-1">1 Month</h3>
              <p className="text-3xl font-bold mb-4">$20</p>
              <p className="text-zinc-500 text-sm mb-4">3 connections</p>
              <Link href="/signup" className="block w-full bg-zinc-800 hover:bg-zinc-700 py-2 rounded-lg text-sm">
                Select
              </Link>
            </div>
            <div className="bg-zinc-900 border-2 border-purple-600 rounded-xl p-6 text-center relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-xs px-3 py-1 rounded-full">Best Value</span>
              <h3 className="font-semibold mb-1">6 Months</h3>
              <p className="text-3xl font-bold mb-1">$90</p>
              <p className="text-green-500 text-sm mb-2">Save $30</p>
              <p className="text-zinc-500 text-sm mb-4">3 connections</p>
              <Link href="/signup" className="block w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-sm">
                Select
              </Link>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
              <h3 className="font-semibold mb-1">12 Months</h3>
              <p className="text-3xl font-bold mb-1">$150</p>
              <p className="text-green-500 text-sm mb-2">Save $90</p>
              <p className="text-zinc-500 text-sm mb-4">3 connections</p>
              <Link href="/signup" className="block w-full bg-zinc-800 hover:bg-zinc-700 py-2 rounded-lg text-sm">
                Select
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Devices */}
      <section className="border-t border-zinc-800 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-8">Works On Your Devices</h2>
          <div className="flex flex-wrap justify-center gap-8 text-zinc-400">
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-sm">iPhone & Android</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔥</div>
              <p className="text-sm">Firestick</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📺</div>
              <p className="text-sm">Smart TVs</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💻</div>
              <p className="text-sm">Web Browser</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎮</div>
              <p className="text-sm">Android TV Box</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="border-t border-zinc-800 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Need Help?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/support" className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-6 h-6 text-purple-500" />
                <h3 className="font-semibold">Chat Support</h3>
              </div>
              <p className="text-zinc-400 text-sm">Get help from our support bot or submit a request. We typically respond within a few hours.</p>
            </Link>
            <a href="https://www.youtube.com/@OmegaTV-IPTV" target="_blank" rel="noopener noreferrer" className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <PlayCircle className="w-6 h-6 text-red-500" />
                <h3 className="font-semibold">Setup Guides</h3>
              </div>
              <p className="text-zinc-400 text-sm">Video tutorials for Firestick, Android, iOS, and more. Step-by-step instructions.</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500">
            <Logo className="w-5 h-5" />
            <span className="text-sm">Omega TV</span>
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/login" className="hover:text-white">Login</Link>
            <Link href="/signup" className="hover:text-white">Sign Up</Link>
            <Link href="/support" className="hover:text-white">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
