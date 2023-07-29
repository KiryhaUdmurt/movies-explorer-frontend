import MoreBtn from "../MoreBtn/MoreBtn";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies({ searchResult }) {
  const loading = false;
  return (
    <main className="movies">
      <SearchForm />
      {loading ? <Preloader /> : <MoviesCardList searchResult={searchResult} />}
      <MoreBtn searchResult={searchResult} />
    </main>
  );
}

export default Movies;
