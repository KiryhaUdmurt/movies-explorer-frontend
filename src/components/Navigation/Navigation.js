import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="nav__links">
      <NavLink className="nav__registration" to="/sign-up">
        Регистрация
      </NavLink>
      <NavLink className="nav__login" to="/sign-in">
        Войти
      </NavLink>
    </nav>
  );
}

export default Navigation;
