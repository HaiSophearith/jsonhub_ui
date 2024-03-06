import React from 'react'
import Hero from '../components/about_page/Hero'
import Body from '../components/about_page/Body'

export default function AboutPage() {
  return (
    <div>
      <div>
        <Hero/>
        </div>
      <div className=' 12pro:mb-5'>
         <Body/>
      </div>
     
    </div>
  )
}
