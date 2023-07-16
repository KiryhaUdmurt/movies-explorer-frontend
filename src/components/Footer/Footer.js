import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
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
