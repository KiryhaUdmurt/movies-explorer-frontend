import MoreBtn from "../MoreBtn/MoreBtn";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies({ cards, search, setSearch, moviesError, isLoading, loadMore, elementNum }) {
  return (
    <main className="movies">
      <SearchForm search={search} setSearch={setSearch} />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList cards={cards} moviesError={moviesError} />
      )}
      <MoreBtn loadMore={loadMore} cards={cards} elementNum={elementNum}/>
    </main>
  );
}

export default Movies;
