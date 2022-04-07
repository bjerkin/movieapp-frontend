import React from "react";
import { MOVIE_IMAGE_BASE_URL } from "../config";
import addedToFavouritesIcon from "../images/added-favourite.png";
import addToFavouritesIcon from "../images/add-favourite.png";
import blankMoviePoster from "../images/blank-movie-poster.avif";

function MovieCard({ movie, setSelectedMovie }) {

  const [isFavourite, setIsFavourite] = React.useState(movie.isFavourite);

  const cropTitle = (title) => {
    if (title.length > 15) {
      return title.substring(0, 15) + "...";
    } else {
      return title;
    }
  };

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <div className="movie-card">
      {<img src={movie.poster_path ? `${MOVIE_IMAGE_BASE_URL}w500${movie.poster_path}` : blankMoviePoster} alt="movie poster" onClick={ () => setSelectedMovie(movie) }/>}

      <div className="movie-card__content">
        <div>
          <h3>{cropTitle(movie.title)}</h3>
          <p>{movie.release_date ? movie.release_date.substring(0, 4) : null}</p>
        </div>
        <div className="favourite-icon">
          {isFavourite ? <img src={addedToFavouritesIcon} alt="added to favourites" onClick={toggleFavourite} /> : <img src={addToFavouritesIcon} alt="add to favourites" onClick={toggleFavourite}/>}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
