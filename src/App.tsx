import Navbar from './components/Navbar'
import OrganicBackground from './components/OrganicBackground'
import IndustrialBackground from './components/IndustrialBackground'
import IndustrialTicker from './components/IndustrialTicker'
import Hero from './components/Hero'
import Architecture from './components/Architecture'
import Workflows from './components/Workflows'
import LlmFit from './components/LlmFit'
import Security from './components/Security'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-surface font-sans">
      <OrganicBackground />
      <IndustrialBackground />
      <IndustrialTicker />
      <Navbar />
      <Hero />
      <Architecture />
      <Workflows />
      <LlmFit />
      <Security />
      <Footer />
    </div>
  )
}

export default App
