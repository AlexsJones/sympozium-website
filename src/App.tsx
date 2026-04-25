import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhySympozium from './components/WhySympozium'
import WhoItsFor from './components/WhoItsFor'
import Workflows from './components/Workflows'
import Features from './components/Features'
import LocalInference from './components/LocalInference'
import LlmFit from './components/LlmFit'
import Architecture from './components/Architecture'
import Comparison from './components/Comparison'
import ComparisonKagent from './components/ComparisonKagent'
import Security from './components/Security'
import GetStarted from './components/GetStarted'
import CRDs from './components/CRDs'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-surface font-sans">
      <Navbar />
      <Hero />
      <WhySympozium />
      <WhoItsFor />
      <LocalInference />
      <Workflows />
      <Features />
      <LlmFit />
      <Architecture />
      <Comparison />
      <ComparisonKagent />
      <Security />
      <CRDs />
      <GetStarted />
      <Footer />
    </div>
  )
}

export default App
