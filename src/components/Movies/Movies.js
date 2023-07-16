import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

function Movies() {
  return (
    <>
      <SearchForm />
      <Preloader />
      <MoviesCardList />
      <MoviesCard />
    </>
  );
}

export default Movies;