import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies({ handleCardLike, likedCards }) {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList
        handleCardLike={handleCardLike}
        likedCards={likedCards}
      />
    </main>
  );
}

export default SavedMovies;
