import React ,{ useEffect }from 'react'
import '../css/Home.css'
import axios from 'axios'
const Home = () => {
  
  return (
    <div className='hero'>
        <div className="hero-content">
            <h1 className='hero-text'>Crescent Library</h1>
            <p className='hero-description'>
                Discover your Next Chapter.
            </p>
        </div>
        <div className="hero-image"></div>
    </div>
  )
}

export default Home