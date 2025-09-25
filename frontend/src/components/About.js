import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='about'>
      <h1>About</h1>
      <p>EcoTogether is a website where people all over the world can share their projects where they are contributing to a greener Earth.</p>
      <p>Created by: Waiz Kamal, Danish Kairulazhar, Daffaa Ali, Ikhwan JUlkifli</p>
      <p>Created with: React.js, Node, Express, MongoDB</p>
      <Link to={'/'} >Back to Login</Link>
    </div>
  )
}

export default About
