import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  const movies = useSelector(store => store.movies)
  return (
    <div>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      {/* 

        MovieList - Popular
          MovieCardsOfPopular

        MovieList - Now Playing
          MovieCardsOfPlaying

        MovieList - Tranding
          MovieCardsOfTranding

        MovieList - Hrror
          MovieCardsOfHrror

      */}
    </div>
  )
}

export default SecondaryContainer