import "./MoviesCard.css";
import imageContent from "../../images/image-content.jpg";

function MoviesCard({
  isSavedPage = false,
  name = "Навазние или краткое описание фильма",
}) {
  return (
    <>
      <li className="card">
        <article className="card__arcticle">
          <img className="card__image" src={imageContent} alt={name} />
          <div className="card__body">
            <div className="card__line">
              <h2 className="card__title">33 слова о дизайне</h2>
              {isSavedPage ? (
                <button className="card__btn-delete" type="button"></button>
              ) : (
                <input type="checkbox" className="card__checkbox" />
              )}
            </div>
            <p className="card__info-time">1ч 42м</p>
          </div>
        </article>
      </li>
    </>
  );
}

export default MoviesCard;
