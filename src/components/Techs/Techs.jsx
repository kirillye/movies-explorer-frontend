import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <div className="container techs__content">
        <h2 className="sub-title techs__title">Технологии.</h2>
        <div className="line techs__line"></div>
        <div className="techs__content">
          <h3 className="techs__sub-title">7 технологий</h3>
          <p className="techs__info">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <ul className="list techs__list">
            <li className="techs__list-item">HTML</li>
            <li className="techs__list-item">CSS</li>
            <li className="techs__list-item">JS</li>
            <li className="techs__list-item">React</li>
            <li className="techs__list-item">Git</li>
            <li className="techs__list-item">Express.js</li>
            <li className="techs__list-item">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;
