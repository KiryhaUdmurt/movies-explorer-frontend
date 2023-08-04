import Switch from "../Switch/Switch";
import "./SearchForm.css";
import searchIcon from "../../images/icon.svg";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

function SearchForm({ search, setSearch, isToggled, setIsToggled }) {

  const switchBtn = document.querySelector(".switch__input");
  const searchRef = useRef("");
  const toggleRef = useRef(false);
  const [preSearch, setPreSearch] = useState(() => {
    const searchTxt = localStorage.getItem('searchTxt');
    return searchTxt || "";
  })
  const [searchDirty, setSearchDirty] = useState(false);
  const [searchError, setSearchError] = useState("Введите ключевое слово");

  const blurHandler = () => {
    setSearchDirty(true);
  };

  const searchHandler = (e) => {
    setPreSearch(e.target.value);
    e.target.value.length === 0 ? setSearchError("Введите ключевое слово") : setSearchError("");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setSearch(preSearch);
    localStorage.setItem('searchTxt', searchRef.current.value);
    console.log(searchRef.current.value)
  }
  const handleToggle = () => {
    setIsToggled(!isToggled);
    localStorage.setItem('toggle', toggleRef.current.checked);
  }

  return (
    <section className="search-form">
      <div className="search-form__search-box">
        <form className="search-form__input-box" onSubmit={e => submitHandler(e)}>
          <img
            src={searchIcon}
            className="search-form__input-icon"
            alt="Иконка лупы"
          />
          <input
            className="search-form__input"
            name="search"
            value={preSearch}
            onChange={e => searchHandler(e)}
            type="text"
            placeholder=" Найти фильм..."
            onBlur={blurHandler}
            ref={searchRef}
          ></input>
          <button className="search-form__btn" type="submit">
            Найти
          </button>
        </form>
        <div className="search-form__short-film-box">
          <div className="search-form__search-divider"></div>
          {/* <Switch isToggled={isToggled} setIsToggled={setIsToggled}/> */}
          <label className="switch">
            <input
              className="switch__input"
              type="checkbox"
              // value={isToggled}
              checked={isToggled}
              onChange={handleToggle}
              ref={toggleRef}
            />
            <span className="switch__slider" />
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
