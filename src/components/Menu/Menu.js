import { NavLink, useLocation } from "react-router-dom";
import profileLogo from "../../images/icon__COLOR_icon-main.svg";
import "./Menu.css";

function Menu({ active, setActive }) {
  const closeMenu = () => setActive(false);
  const location = useLocation();
  const currentPage = (path) => {
    return location.pathname === `/${path}` && "menu__current-page";
  }
  return (
    <div className={active ? "menu menu_active" : "menu_disabled"} onClick={closeMenu}>
      <div className="menu__dark">

      <div className="menu__content" onClick={e => e.stopPropagation()}>
        <button className="menu__close-btn" aria-label="Закрыть меню" onClick={closeMenu} />
        <nav className="menu__links">
          <NavLink className={`menu__main ${currentPage("")}`} to="/" onClick={closeMenu}>
            Главная
          </NavLink>
          <NavLink className={`menu__movies ${currentPage("movies")}`} to="/movies" onClick={closeMenu}>
            Фильмы
          </NavLink>
          <NavLink className={`menu__saved-movies ${currentPage("saved-movies")}`} to="/saved-movies" onClick={closeMenu}>
            Сохраненные фильмы
          </NavLink>
          <NavLink className="menu__profile" to="/profile" onClick={closeMenu}>
            <img
              className="menu__profile-pic"
              src={profileLogo}
              alt="Иконка профиля"
            />
            <p className="menu__profile-txt">Аккаунт</p>
          </NavLink>
        </nav>
      </div>
      </div>
    </div>
  );
}

export default Menu;
