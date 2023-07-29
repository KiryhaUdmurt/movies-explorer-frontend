import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__link-container">
        <a
          href="https://kir.nomoredomains.rocks"
          className="portfolio__link"
          target="_blank"
        >
          <p className="portfolio__link-txt">Статичный сайт</p>
          <p className="portfolio__link-symbol">↗</p>
        </a>
      </div>
      <div className="portfolio__link-container">
        <a
          href="https://kiryhaudmurt.github.io/amazing-russia/"
          className="portfolio__link"
          target="_blank"
        >
          <p className="portfolio__link-txt">Адаптивный сайт</p>
          <p className="portfolio__link-symbol">↗</p>
        </a>
      </div>
      <div className="portfolio__link-container">
        <a
          href="https://kiryhaudmurt.github.io/how-to-learn/"
          className="portfolio__link"
          target="_blank"
        >
          <p className="portfolio__link-txt">Одностраничное приложение</p>
          <p className="portfolio__link-symbol">↗</p>
        </a>
      </div>
    </section>
  );
}

export default Portfolio;
