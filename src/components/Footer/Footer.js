import { useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const location = useLocation();
  const footerClassName = `footer ${
    (location.pathname !== "/" &&
      location.pathname !== "/saved-movies" &&
      location.pathname !== "/movies") &&
    "footer_disabled"
  }`;
  return (
    <footer className={footerClassName}>
      <div className="footer__content-container">
        <p className="footer__feat">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__divider"></div>
        <div className="footer__flex-container">
          <p className="footer__year">© 2023</p>
          <a
            className="footer__practikum-link"
            href="https://practicum.yandex.ru/"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__github-link"
            href="https://github.com/KiryhaUdmurt"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
