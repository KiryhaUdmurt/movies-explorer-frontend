import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies({
  handleLikeCard,
  likedCards,
  setLikedCards,
  handleDeleteCard,
  isLikedCard,
  handleSearchSavedCards,
  isToggledSavedCards,
  setIsToggledSavedCards,
  savedMoviesSearch,
  setSavedMoviesSearch
}) {
  return (
    <main className="saved-movies">
      <SearchForm
        isToggledSavedCards={isToggledSavedCards}
        setIsToggledSavedCards={setIsToggledSavedCards}
        handleSearchSavedCards={handleSearchSavedCards}
        savedMoviesSearch={savedMoviesSearch}
        setSavedMoviesSearch={setSavedMoviesSearch}
        likedCards={likedCards}
      />
      <MoviesCardList
        handleLikeCard={handleLikeCard}
        likedCards={likedCards}
        handleDeleteCard={handleDeleteCard}
        setLikedCards={setLikedCards}
        isLikedCard={isLikedCard}
      />
    </main>
  );
}

export default SavedMovies;
