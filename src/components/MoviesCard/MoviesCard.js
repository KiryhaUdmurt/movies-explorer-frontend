import "./MoviesCard.css";
import moviePreview from "../../images/pic__COLOR_pic.png";
import { useLocation } from "react-router-dom";

function MoviesCard() {
  const isLiked = 0;
  const location = useLocation();
  const movieLikeBtnClassName = `movie__like-btn ${
    isLiked && "movie__like-btn_active"
  }`;

  return (
    <div className="movie">
      <img className="movie__image" src={moviePreview} alt="Превью фильма" />
      <div className="movie__info-bar">
        <h3 className="movie__title">33 слова о дизайне</h3>
        {location.pathname === "/movies" && (
          <button
            className={movieLikeBtnClassName}
            type="button"
            aria-label="В избранное"
          />
        )}
        {location.pathname === "/saved-movies" && (
          <button
            className="movie__delete-btn"
            type="button"
            aria-label="Удалить фильм"
          />
        )}
        <p className="movie__duration">1ч 47м</p>
      </div>
    </div>
  );
}

export default MoviesCard;
