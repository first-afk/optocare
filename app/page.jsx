import React from 'react'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import About from './components/About'

const page = () => {
  return (
    <main className=' bg-surface-dim'>
      <section className='h-[50vh]'>
        <Hero />
      </section>
      <section className='section-spacing'>
        <Dashboard />
      </section>
      <section className='section-spacing'>
        <About />
      </section>
    </main>
  )
}

export default page