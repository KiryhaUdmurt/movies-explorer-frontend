import { useLocation } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

function Header({ menuActive, setActive, isLoggedIn }) {
  const location = useLocation();
  const headerClassname = `header ${
    location.pathname === "/" && "header_logged"
  } ${
    location.pathname !== "/" &&
    location.pathname !== "/movies" &&
    location.pathname !== "/saved-movies" &&
    location.pathname !== "/profile" &&
    "header_disabled"
  }`;
  return (
    <header className={headerClassname}>
      <div className="header__content-container">
        <Logo />
        <Navigation menuActive={menuActive} setActive={setActive} isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}

export default Header;
