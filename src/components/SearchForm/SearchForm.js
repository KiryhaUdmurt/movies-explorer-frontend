import Switch from "../Switch/Switch";
import "./SearchForm.css";
import searchIcon from "../../images/icon.svg";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

function SearchForm({ search, setSearch }) {

  const { register, formState: { errors }, handleSubmit, getValues } = useForm({mode: "onSubmit"});

  const searchRef = useRef("");

  function submitSearch(e) {
    e.preventDefault();
    setSearch(searchRef.current.value);
  }

  const onSubmit = (e) => {
    // e.preventDefault();
    setSearch(getValues('search'));
  }

  return (
    <section className="search-form">
      <div className="search-form__search-box">
        <form className="search-form__input-box" onSubmit={handleSubmit(onSubmit)}>
          <img
            src={searchIcon}
            className="search-form__input-icon"
            alt="Иконка лупы"
          />
          <input
            className="search-form__input"
            // value={search}
            // onChange={e => setSearch(e.target.value)}
            type="text"
            placeholder=" Найти фильм..."
            // required
            // ref={searchRef}
            ref={register}
            {...register('search', {
              required: "Введите ключевое слово"
            })}
          ></input>
          <button
            className="search-form__btn"
            type="submit"
          >
            Найти
          </button>
        </form>
        <div className="search-form__short-film-box">
          <div className="search-form__search-divider"></div>
          <Switch />
          <p className="search-form__txt">Короткометражки</p>
        </div>
      </div>
      <div className="search-form__divider"></div>
      <div className="search-form__error-container">
            {errors?.search && (
              <span className="search-form__error">
                {errors?.search?.message}
              </span>
            )}
          </div>
    </section>
  );
}

export default SearchForm;
