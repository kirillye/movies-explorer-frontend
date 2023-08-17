import "./AboutMe.css";
import prfileImage from "../../images/profile.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <div className="container">
        <h2 className="sub-title about-me__title">Студент</h2>
        <div className="line about-me__line"></div>
        <div className="about-me__content">
          <div className="about-me__text-info">
            <div className="about-me__main-info">
              <h3 className="about-me__sub-title">Кирилл</h3>
              <span className="about-me__about-me">
                Фронтенд-разработчик, 23 года
              </span>
              <p className="about-me__information">
                Я живу в городе Мытищи, с детства мне нравилось все что связанно
                с информационными технологиями и разработкой. Разрабатываю сайты
                уже 3 года на wordpress. Решил что хочу пройти курс по
                веб-разработке, начал заниматься различными заказами и
                подрабатывать.
              </p>
            </div>
            <a className="about-me__link" href="#" target="_blank">
              Github
            </a>
          </div>
          <img
            src={prfileImage}
            alt="Фотография в Портфолио"
            className="about-me__photo"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
