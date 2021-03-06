import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MOVIE_API_URL, REACT_APP_MOVIE_API_KEY } from "../config";
import MovieCard from "./MovieCard";
import Header from "./Header";
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const Favourites = ({ genres }) => {

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  // Function that checks if the movie is in the favourites list
  const checkMovieOnTheList = (id) => {
    if (id === null) return false;

    let isOnTheList = false;

    isOnTheList = movies.find((movie) => movie.id === id);

    return isOnTheList;
  };

  const fetchFavouriteMovies = async () => {
    //movieIds example value: [399566, 634649]
    let movieIds = user.favourites;
    setMovies([]);

    for (let i = 0; i < movieIds.length; i++) {
      const { data: result } = await axios.get(`${MOVIE_API_URL}movie/${movieIds[i]}`, {
        params: {
          api_key: REACT_APP_MOVIE_API_KEY,
        },
      });

      result.isFavourite = true;

      if (!checkMovieOnTheList(result.id)) {
        movies.push(result);
      }
    }
    setMovies(movies);
  };

  const renderMovies = () => {
    return movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
  };

  const filterMovies = (searchKey) => {

    if (searchKey === "") {
      fetchFavouriteMovies();
      return;
    }

    let filteredMovies = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchKey.toLowerCase());
    });

    setMovies(filteredMovies);
  };

  //BUG UseEffect running twice
  useEffect(() => {

    if (user === null) navigate("/");
    
    fetchFavouriteMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-background">
      <Header className="hero__header container" onSubmit={filterMovies} setSearchKey={setSearchKey} />
      {
        <div className="heading__search-results">
          <h1>{searchKey ? `Favourites Search Results: ${searchKey}` : "Favourites:"}</h1>
          <div className="heading__search-results-line" />
        </div>
      }
      <div className="movie-list">{renderMovies()}</div>
    </div>
  );
};

export default Favourites;