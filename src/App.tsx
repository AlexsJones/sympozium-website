import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhySympozium from './components/WhySympozium'
import WhoItsFor from './components/WhoItsFor'
import Workflows from './components/Workflows'
import Membrane from './components/Membrane'
import LocalInference from './components/LocalInference'

import Architecture from './components/Architecture'
import Security from './components/Security'
import Comparison from './components/Comparison'
import ComparisonKagent from './components/ComparisonKagent'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-surface font-sans">
      <Navbar />
      <Hero />
      <WhySympozium />
      <WhoItsFor />
      <Architecture />
      <Workflows />
      <Membrane />
      <LocalInference />
      <Security />
      <Comparison />
      <ComparisonKagent />
      <Footer />
    </div>
  )
}

export default App
