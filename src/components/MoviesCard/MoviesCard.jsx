import "./MoviesCard.css";
import imageContent from "../../images/image-content.jpg";

function MoviesCard({ isSavedPage = false }) {
  return (
    <>
      <li className="card">
        <article className="card__arcticle">
          <img
            className="card__image"
            src={imageContent}
            alt="Филь 33 слова о дизайне"
          />
          <div className="card__body">
            <div className="card__line">
              <h3 className="card__title">33 слова о дизайне</h3>
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
