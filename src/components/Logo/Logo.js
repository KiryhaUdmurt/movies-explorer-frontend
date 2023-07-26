import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Logo.css";

function Logo({ className }) {
  return (
    <Link className={`logo ${className}`} to="/">
      <img className={`logo__img ${className}`} src={logo} alt="Логотип" />
    </Link>
  );
}

export default Logo;
