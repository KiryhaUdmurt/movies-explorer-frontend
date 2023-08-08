import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
  cards,
  onMovieClick,
  onMovieLike,
  onMovieDelete,
  moviesError,
  handleCardLike,
  likedCards
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
                          onMovieClick={handleCardLike}
                          // onMovieLike={onMovieLike}
                          onMovieDelete={onMovieDelete}
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
                          onMovieClick={handleCardLike}
                          // onMovieLike={onMovieLike}
                          onMovieDelete={onMovieDelete}
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
          {/* {cards.length ? (
            <section className="cardlist">
              <ul className="cardlist__items">
                {cards.map((card) => (
                  <li className="cardlist__item movie" key={card.id}>
                    <MoviesCard
                      card={card}
                      onMovieClick={onMovieClick}
                      onMovieLike={onMovieLike}
                      onMovieDelete={onMovieDelete}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="cardlist__no-results">
              <p className="cardlist__no-results-text">Ничего не найдено</p>
            </section>
          )} */}
        </>
      ) : (
        <section className="cardlist__req-error">
          <p className="cardlist__req-error-text">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </p>
        </section>
      )}

      {/* {cards.length ? (
        <section className="cardlist">
          <ul className="cardlist__items">
            {cards.map((card) => (
              <li className="cardlist__item movie" key={card.id}>
                <MoviesCard
                  card={card}
                  onMovieClick={onMovieClick}
                  onMovieLike={onMovieLike}
                  onMovieDelete={onMovieDelete}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="cardlist__no-results">
          <p className="cardlist__no-results-text">Ничего не найдено</p>
        </section>
      )} */}
    </>
  );
}

export default MoviesCardList;
