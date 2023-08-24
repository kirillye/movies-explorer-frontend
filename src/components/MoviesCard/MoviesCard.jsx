import "./MoviesCard.css";
import imageContent from "../../images/image-content.jpg";

function MoviesCard({ isSavedPage = false, cardInfo }) {
  const cardUrl = `https://api.nomoreparties.co/${cardInfo.image.url} `;
  const durationTime = function () {
    const hour = Math.round(Number(cardInfo.duration) / 60);
    const min = Number(cardInfo.duration) % 60;

    return `${hour}ч ${min}м`;
  };
  return (
    <>
      <li className="card">
        <article className="card__arcticle">
          <img className="card__image" src={cardUrl} alt={cardInfo.nameRU} />
          <div className="card__body">
            <div className="card__line">
              <h2 className="card__title">{cardInfo.nameRU}</h2>
              {isSavedPage ? (
                <button className="card__btn-delete" type="button"></button>
              ) : (
                <input type="checkbox" className="card__checkbox" />
              )}
            </div>
            <p className="card__info-time">{durationTime()}</p>
          </div>
        </article>
      </li>
    </>
  );
}

export default MoviesCard;
