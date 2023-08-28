import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({
  card,
  onMovieClick,
  isLikedCard,
  handleDeleteCard,
}) {
  const location = useLocation();
  const isLiked = isLikedCard(card);

  const movieLikeBtnClassName = `movie__like-btn ${
    isLiked && "movie__like-btn_active"
  }`;

  const hours = Math.floor(card.duration / 60);
  const minutes = card.duration - hours * 60;

  function onLikeCard() {
    onMovieClick(card);
  }

  function onDeleteCard() {
    handleDeleteCard(card);
  }

  return (
    <div className="movie">
      <a
        className="movie__trailer-link"
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie__image"
          src={
            location.pathname === "/movies"
              ? `https://api.nomoreparties.co/${card.image.url}`
              : card.image
          }
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
            onClick={!isLiked ? onLikeCard : onDeleteCard}
          />
        )}
        {location.pathname === "/saved-movies" && (
          <button
            className="movie__delete-btn"
            type="button"
            aria-label="Удалить фильм"
            onClick={onDeleteCard}
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
