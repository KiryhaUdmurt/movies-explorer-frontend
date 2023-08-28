import "./SearchForm.css";
import searchIcon from "../../images/icon.svg";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({
  search,
  setSearch,
  isToggled,
  setIsToggled,
  isToggledSavedCards,
  setIsToggledSavedCards,
  handleSearch,
  handleSearchSavedCards,
  savedMoviesSearch,
  setSavedMoviesSearch,
  likedCards
}) {
  const searchRef = useRef("");
  const savedSearchRef = useRef("");
  const toggleRef = useRef(false);
  const savedCardsToggleRef = useRef(false);
  const [searchDirty, setSearchDirty] = useState(false);
  const [searchError, setSearchError] = useState("");
  const location = useLocation();
  const moviesPath = location.pathname === "/movies";

  const blurHandler = () => {
    setSearchDirty(true);
  };

  const handleMainSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    localStorage.setItem("searchTxt", value);
    !value
      ? setSearchError("Введите ключевое слово")
      : setSearchError("");
  };

  const handleSavedSearch = (e) => {
    setSavedMoviesSearch(e.target.value);
    !e.target.value
      ? setSearchError("Введите ключевое слово")
      : setSearchError("");
  };

  const searchHandler = (e) => {
    moviesPath ? handleMainSearch(e) : handleSavedSearch(e);
  };

  const searchMain = () => {
    handleSearch();
    localStorage.setItem("searchTxt", searchRef.current.value);
  };

  const searchSaved = () => {
    handleSearchSavedCards(likedCards);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    moviesPath ? searchMain() : searchSaved();
  };

  const handleSavedToggle = () => {
    setIsToggledSavedCards((isToggledSavedCards) => !isToggledSavedCards);
  };

  const handleMainToggle = () => {
    setIsToggled((isToggled) => !isToggled);
    localStorage.setItem("toggle", toggleRef.current.checked);
  };

  const handleToggle = () => {
    moviesPath ? handleMainToggle() : handleSavedToggle();
  };

  return (
    <section className="search-form">
      <div className="search-form__search-box">
        <form
          className="search-form__input-box"
          onSubmit={(e) => submitHandler(e)}
        >
          <img
            src={searchIcon}
            className="search-form__input-icon"
            alt="Иконка лупы"
          />
          <input
            className="search-form__input"
            name="search"
            value={moviesPath ? search : savedMoviesSearch}
            onChange={(e) => searchHandler(e)}
            type="text"
            placeholder=" Найти фильм..."
            onBlur={blurHandler}
            ref={moviesPath ? searchRef : savedSearchRef}
          ></input>
          <button className="search-form__btn" type="submit">
            Найти
          </button>
        </form>
        <div className="search-form__short-film-box">
          <div className="search-form__search-divider"></div>
          <label className="search-form__switch">
            <input
              className="search-form__switch-input"
              type="checkbox"
              checked={moviesPath ? isToggled : isToggledSavedCards}
              onChange={handleToggle}
              ref={moviesPath ? toggleRef : savedCardsToggleRef}
            />
            <span className="search-form__switch-slider" />
          </label>
          <p className="search-form__txt">Короткометражки</p>
        </div>
      </div>
      <div className="search-form__divider"></div>
      {searchDirty && searchError && (
        <div className="search-form__error-container">
          <span className="search-form__error">{searchError}</span>
        </div>
      )}
    </section>
  );
}

export default SearchForm;
