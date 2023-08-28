import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
  cards,
  moviesError,
  handleLikeCard,
  isLikedCard,
  likedCards,
  setLikedCards,
  handleDeleteCard,
}) {
  const location = useLocation();
  return (
    <>
      {!moviesError ? (
        <>
          {location.pathname === "/movies" ? (
            <>
              {cards.length ? (
                <section className="cardlist">
                  <ul className="cardlist__items">
                    {cards.map((card) => (
                      <li className="cardlist__item movie" key={card.id}>
                        <MoviesCard
                          card={card}
                          onMovieClick={handleLikeCard}
                          isLikedCard={isLikedCard}
                          handleDeleteCard={handleDeleteCard}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ) : (
                <section className="cardlist__no-results">
                  <p className="cardlist__no-results-text">Ничего не найдено</p>
                </section>
              )}
            </>
          ) : (
            <>
              {likedCards.length ? (
                <section className="cardlist">
                  <ul className="cardlist__items">
                    {likedCards.map((card) => (
                      <li className="cardlist__item movie" key={card.movieId}>
                        <MoviesCard
                          card={card}
                          handleDeleteCard={handleDeleteCard}
                          setLikedCards={setLikedCards}
                          isLikedCard={isLikedCard}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ) : (
                <section className="cardlist__no-results">
                  <p className="cardlist__no-results-text">Ничего не найдено</p>
                </section>
              )}
            </>
          )}
        </>
      ) : (
        <section className="cardlist__req-error">
          <p className="cardlist__req-error-text">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </p>
        </section>
      )}
    </>
  );
}

export default MoviesCardList;
