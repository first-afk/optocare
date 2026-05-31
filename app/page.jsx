import React from 'react'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import About from './components/About'

const page = () => {
  return (
    <main className='bg-surface'>
      <section className='h-[50vh]'>
        <Hero />
      </section>
      <section className='pb-20 pt-20'>
        <Dashboard />
      </section>
      <section className='pb-20'>
        <About />
      </section>
    </main>
  )
}

export default page