import Header from './components/Header'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import WhatsAppPay from './components/WhatsAppPay'
import OpenFinance from './components/OpenFinance'
import Plans from './components/Plans'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      <Hero />
      <Dashboard />
      <WhatsAppPay />
      <OpenFinance />
      <Plans />
      <FAQ />
      <Footer />
    </div>
  )
}

export default App
