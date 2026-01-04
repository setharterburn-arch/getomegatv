import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Navbar Placeholder - Needs to be a component */}
      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 0', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '1.5rem' }} className="text-gradient">OMEGA TV</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="https://www.youtube.com/@omegatv4u" target="_blank">Troubleshooting</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/login">Login</Link>
          <Link href="/plans" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container section-py" style={{ textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Stream <span className="text-gradient">Without Limits</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#a1a1aa', maxWidth: '600px', marginBottom: '2.5rem' }}>
          Experience the future of entertainment with Omega TV. Unlimited access to global content in 1080p FHD.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/plans" className="btn btn-primary">View Plans</Link>
          <Link href="/features" className="btn btn-outline">Learn More</Link>
        </div>

        {/* Floating/Glass Elements for visuals - Full Width Banner */}
        <div style={{
          marginTop: '4rem',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          position: 'relative',
          height: '500px', // Restrict height to be more banner-like
          overflow: 'hidden'
        }}>
          <div className="glass-card" style={{
            borderRadius: '0',
            borderLeft: 'none',
            borderRight: 'none',
            height: '100%',
            position: 'relative'
          }}>
            <Image
              src="/tivimate_mockup.png"
              alt="Omega TV Interface"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'top center', // Focus on the top part of the UI
                opacity: 0.9
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '100px',
              background: 'linear-gradient(to top, #000 0%, transparent 100%)',
              zIndex: 1
            }} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container section-py">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'Full HD Streaming', desc: 'Crystal clear picture quality on all your devices.' },
            { title: 'Global Content', desc: 'Access channels and movies from around the world.' },
            { title: 'No Buffering', desc: 'Lightning fast servers ensure uninterrupted viewing.' }
          ].map((feature, i) => (
            <div key={i} className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>{feature.title}</h3>
              <p style={{ color: '#a1a1aa' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
