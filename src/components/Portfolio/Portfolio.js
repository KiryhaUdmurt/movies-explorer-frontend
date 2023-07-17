import "./Portfolio.css"

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__portfolio">Портфолио</p>
      <div className="portfolio__link-container">
        <a href="" className="portfolio__link">
          Статичный сайт
        </a>
        <p className="portfolio__link-symbol">↗</p>
      </div>
      <div className="portfolio__link-container">
        <a href="" className="portfolio__link">
          Адаптивный сайт
        </a>
        <p className="portfolio__link-symbol">↗</p>
      </div>
      <div className="portfolio__link-container">
        <a href="" className="portfolio__link">
          Одностраничное приложение
        </a>
        <p className="portfolio__link-symbol">↗</p>
      </div>
    </section>
  );
}

export default Portfolio;