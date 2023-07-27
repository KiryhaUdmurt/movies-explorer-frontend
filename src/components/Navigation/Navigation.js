import { NavLink, useLocation } from "react-router-dom";
import profileLogo from "../../images/icon__COLOR_icon-main.svg";
import "./Navigation.css";

function Navigation({ menuActive, setActive }) {
  const isLoggedIn = true;
  const location = useLocation();
  const whiteTextClass = `${location.pathname === "/" && "navigation_white"}`
  const currentPage = (path) => {
    return location.pathname === `/${path}` && "navigation__current-page";
  }
  return (
    <div className="naviagtion">
      {!isLoggedIn && (
        <nav className="navigation__unlogged">
          <NavLink className="navigation__registration" to="/signup">
            Регистрация
          </NavLink>
          <NavLink className="navigation__login" to="/signin">
            Войти
          </NavLink>
        </nav>
      )}
      {isLoggedIn && (
        <>
          <button onClick={() => setActive(!menuActive)}
            className="navigation__burger-btn"
            type="button"
            aria-label="Всплывающее меню"
          />
          <nav className="navigation__logged">
            <div className="navigation__movies-links">
              <NavLink className={`navigation__movies ${whiteTextClass} ${currentPage("movies")}`} to="/movies">
                Фильмы
              </NavLink>
              <NavLink className={`navigation__saved-movies ${whiteTextClass} ${currentPage("saved-movies")}`} to="/saved-movies">
                Сохраненные фильмы
              </NavLink>
            </div>
            <NavLink className="navigation__profile" to="/profile">
              <img
                className="navigation__pic"
                src={profileLogo}
                alt="Иконка профиля"
              />
              <p className={`navigation__profile-word ${whiteTextClass}`}>Аккаунт</p>
            </NavLink>
          </nav>
        </>
      )}
    </div>
  );
}

export default Navigation;
