import Navbar from './components/Navbar'
import OrganicBackground from './components/OrganicBackground'
import IndustrialBackground from './components/IndustrialBackground'
import IndustrialTicker from './components/IndustrialTicker'
import Hero from './components/Hero'
import AgentHarness from './components/AgentHarness'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-surface font-sans">
      <OrganicBackground />
      <IndustrialBackground />
      <IndustrialTicker />
      <Navbar />
      <Hero />
      <AgentHarness />
      <Footer />
    </div>
  )
}

export default App
