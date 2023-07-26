import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ movies, onMovieClick, onMovieLike, onMovieDelete, searchResult }) {
  return (
    <>
      {searchResult && (
        <section className="cardlist">
          <ul className="cardlist__items">
            {/* {movies.map((movie) => (
            <li className="cardlist__item movie" key={movie._id}>
              <MoviesCard
                movie={movie}
                onMovieClick={onMovieClick}
                onMovieLike={onMovieLike}
                onMovieDelete={onMovieDelete}
              />
            </li>
          ))} */}
            <li className="cardlist__item">
              <MoviesCard />
            </li>
            <li className="cardlist__item">
              <MoviesCard />
            </li>
            <li className="cardlist__item">
              <MoviesCard />
            </li>
          </ul>
        </section>
      )}
      {!searchResult && (
        <section className="carlist__no-results">
          <p className="cardlist__no-results-text">Нет результатов</p>
        </section>
      )}
    </>
  );
}

export default MoviesCardList;
