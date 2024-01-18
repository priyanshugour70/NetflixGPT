import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // Check if movies is an array before mapping
  if (!Array.isArray(movies) || movies.length === 0) {
    return (
      <div className="px-6">
        <h1>{title}</h1>
        <p>No movies available</p>
      </div>
    );
  }

  return (
    <div div className="px-6 ">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex ">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
