import Switch from "../Switch/Switch";
import "./SearchForm.css";
import searchIcon from "../../images/icon.svg";

function SearchForm() {
  return (
    <section className="search-form">
      <div className="search-form__search-box">
        <form className="search-form__input-box">
          <img src={searchIcon} className="search-form__input-icon" alt="Иконка лупы" />
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            required
          ></input>
          <button className="search-form__btn">Найти</button>
        </form>
        <div className="search-form__short-film-box">
        <div className="search-form__search-divider"></div>
          <Switch />
          <p className="search-form__txt">Короткометражки</p>
        </div>
      </div>
      <div className="search-form__divider"></div>
    </section>
  );
}

export default SearchForm;
