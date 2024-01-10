import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" + movieId + "/videos",
        API_OPTIONS
      );

      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      const json = await data.json();

      const filterData = json.results.filter(
        (video) => video.type === "Trailer"
      );

      const trailer = filterData.length ? filterData[0] : json.results[0];


      dispatch(addTrailerVideo(trailer));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []); // Include dependencies in the array
};

export default useMovieTrailer;
