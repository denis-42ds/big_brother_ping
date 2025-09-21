import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Alerts from '../components/Alerts'
import Dashboard from '../components/Dashboard'
import Stats from '../components/Stats'
import Footer from '../components/Footer'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <main>
        <Hero />
        <Stats />
        <section id="monitoring">
          <Features />
        </section>
        <section id="alerts">
          <Alerts />
        </section>
        <section id="analytics">
          <Dashboard />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage

