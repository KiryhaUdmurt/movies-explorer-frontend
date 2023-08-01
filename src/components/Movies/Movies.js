import MoreBtn from "../MoreBtn/MoreBtn";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies({ cards, search, setSearch, moviesError, isLoading }) {
  return (
    <main className="movies">
      <SearchForm search={search} setSearch={setSearch} />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList cards={cards} moviesError={moviesError} />
      )}
      <MoreBtn />
    </main>
  );
}

export default Movies;
