import Navbar from './Navbar'
import OrganicBackground from './OrganicBackground'
import IndustrialBackground from './IndustrialBackground'
import IndustrialTicker from './IndustrialTicker'
import Hero from './Hero'
import AgentHarness from './AgentHarness'
import Footer from './Footer'
import s from './LandingPage.module.css'

function LandingVideo() {
  return <figure className={s.figure}>
    <video
      className={s.video}
      width={1168}
      height={784}
      autoPlay
      muted
      loop
      playsInline
      controls
      preload="auto"
      poster="/video/sympozium-native-cells-poster.jpg"
      aria-label="Sympozium native cells: live conversation context, bounded tool execution, returned results, and disposable work cells"
      aria-describedby="video-description"
    >
      <source src="/video/sympozium-native-cells.mp4" type="video/mp4" />
      <a href="/video/sympozium-native-cells.mp4">Watch the native cells animation</a>
    </video>
    <figcaption id="video-description" className={s.caption}>
      <span>Keep the context. Bound the work.</span>
      <a href="https://github.com/sympozium-ai/sympozium/discussions/472" target="_blank" rel="noopener noreferrer">Native cells release ↗</a>
    </figcaption>
    <details className={s.transcript}><summary>About the animation</summary><p>Sympozium coordinates agents and governs execution on Kubernetes. In the native Celln path, a parent retains live conversation context between turns. A disposable child receives bounded tool authority, executes the work, returns a result, and is cleaned up. The next turn gets a fresh child. This release supports one active turn at a time; live context does not survive a host crash.</p></details>
  </figure>
}

export default function LandingPage() {
  return <div className="min-h-screen bg-surface font-sans">
    <OrganicBackground /><IndustrialBackground /><IndustrialTicker /><Navbar />
    <main><Hero media={<LandingVideo />} /><AgentHarness /></main>
    <Footer />
  </div>
}
