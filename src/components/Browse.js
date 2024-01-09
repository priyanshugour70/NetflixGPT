import React, { useEffect } from "react";
import Header from "./Header";
import { API_OPTIONS } from "../utils/constants";

const Browse = () => {
  const getNowPlayingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return (
    <div>
      <Header />
      Browse
    </div>
  );
};

export default Browse;
