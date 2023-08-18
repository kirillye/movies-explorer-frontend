import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="sub-title about__title">О проекте</h2>
        <ul className="list about__articles">
          <li>
            <article className="about__arcticle">
              <h3 className="about__arcticle-title about__arcticle-title-sprints">
                Дипломный проект включал 5 этапов
              </h3>
              <p className="about__arcticle-info">
                Составление плана, работу над бэкендом, вёрстку, добавление
                функциональности и финальные доработки.
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="about__arcticle-title">
                На выполнение диплома ушло 5 недель
              </h3>
              <p className="about__arcticle-info">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                соблюдать, чтобы успешно защититься.
              </p>
            </article>
          </li>
        </ul>
        <div className="about__time-line">
          <div className="about__backend">1 неделя</div>
          <div className="about__front">4 недели</div>
        </div>
        <div className="about__names-times">
          <p className="about__backend-info">Back-end</p>
          <p className="about__front-info">Back-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
