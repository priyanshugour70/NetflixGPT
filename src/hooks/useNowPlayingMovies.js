import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
      // Fetch Data from TMDB API and update store with new data
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );

      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      const json = await data.json();

      dispatch(addNowPlayingMovies(json.results));

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
}

export default useNowPlayingMovies;