import React from "react";
import "./MoviesCard.css";
import moviePreview from "../../images/pic__COLOR_pic.png";
import { useLocation } from "react-router-dom";

function MoviesCard({ card }) {
  const isLiked = 0;
  const location = useLocation();
  const movieLikeBtnClassName = `movie__like-btn ${
    isLiked && "movie__like-btn_active"
  }`;

  const hours = Math.floor(card.duration / 60);
  const minutes = card.duration - hours * 60;


  return (
    <div className="movie">
      <a className="movie__trailer-link" href={card.trailerLink} target="_blank">
        <img
        className="movie__image"
        src={`https://api.nomoreparties.co/${card.image.url}`}
        alt="Превью фильма"
      />
      </a> 
      
      <div className="movie__info-bar">
        <h3 className="movie__title">{card.nameRU}</h3>
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
        <p className="movie__duration">
          {hours}ч {minutes}м
        </p>
      </div>
    </div>
  );
}

export default MoviesCard;
