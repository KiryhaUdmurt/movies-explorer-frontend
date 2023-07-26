import { NavLink, useLocation } from "react-router-dom";
import profileLogo from "../../images/icon__COLOR_icon-main.svg";
import "./Navigation.css";

function Navigation({ menuActive, setActive }) {
  const isLoggedIn = true;
  const loaction = useLocation();
  const whiteTextClass = `${loaction.pathname === "/" && "navigation_white"}`
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
              <NavLink className={`navigation__movies ${whiteTextClass}`} to="/movies">
                Фильмы
              </NavLink>
              <NavLink className={`navigation__saved-movies ${whiteTextClass}`} to="/saved-movies">
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
