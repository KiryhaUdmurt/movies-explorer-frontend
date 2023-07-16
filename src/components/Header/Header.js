import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header">
      <div className="header__content-container">
        <Link className="header__logo-container" to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
