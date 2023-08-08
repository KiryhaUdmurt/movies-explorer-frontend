import React, { useContext, useEffect, useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({ card, onMovieClick }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);
  const movieLikeBtnClassName = `movie__like-btn ${
    isLiked && "movie__like-btn_active"
  }`;

  const hours = Math.floor(card.duration / 60);
  const minutes = card.duration - hours * 60;

  function handleCardClick() {
    setIsLiked((isLiked) => !isLiked)
    onMovieClick(card);
  }



  return (
    <div className="movie">
      <a
        className="movie__trailer-link"
        href={card.trailerLink}
        target="_blank"
      >
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
            onClick={handleCardClick}
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
