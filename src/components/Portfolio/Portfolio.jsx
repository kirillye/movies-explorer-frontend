import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="list portfolio__list">
          <li className="portfolio__item">
            <a
              target="_blank"
              href="https://kirillye.github.io/how-to-learn/"
              className="portfolio__link"
              rel="noreferrer"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a
              target="_blank"
              href="https://kirillye.github.io/russian-travel/"
              className="portfolio__link"
              rel="noreferrer"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a
              target="_blank"
              href="https://mesto.kirill.nomoredomains.work/"
              className="portfolio__link"
              rel="noreferrer"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
