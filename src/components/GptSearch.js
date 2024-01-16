import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import {MAIN_BACKGROUND } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
        <div className="absolute -z-10 ">
        <img
          src={MAIN_BACKGROUND}
          alt="Netlfix Background Img"
        />
      </div>
        <GptSearchBar/>
        <GptMovieSuggestions/>
        
    </div>
  )
}

export default GptSearch