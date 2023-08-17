import "./Footer.css";

function Footer({ logo, loggedIn, handleLogOut, userData }) {
  const date = new Date();
  const newDateYears = date.getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="container-padding-small">
          <p className="footer__name-project">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
          <div className="footer__line"></div>
          <div className="footer__down">
            <time className="footer__date-info">© {newDateYears}</time>
            <ul className="list footer__links">
              <li className="footer__links-item">
                <a
                  href="https://practicum.yandex.ru"
                  target="_blank"
                  rel="noreferrer"
                  className="link_color_white footer__links-link"
                >
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__links-item">
                <a
                  href="https://github.com/kirillye"
                  target="_blank"
                  rel="noreferrer"
                  className="link_color_white footer__links-link"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
