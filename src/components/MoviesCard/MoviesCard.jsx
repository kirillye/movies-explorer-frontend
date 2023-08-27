import "./MoviesCard.css";
import imageContent from "../../images/image-content.jpg";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({
  isSaved = false,
  isSavedPage = false,
  card,
  handleSaveMovies,
  handleDeleteMovies,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [inputValue, setInputValue] = useState(isSaved);
  let cardUrl;
  if (isSavedPage) {
    cardUrl = card.image;
  } else {
    cardUrl = `https://api.nomoreparties.co/${card.image.url}`;
  }

  const durationTime = function () {
    const hour = Math.round(Number(card.duration) / 60);
    const min = Number(card.duration) % 60;
    return `${hour}ч ${min}м`;
  };

  function deleteMovies(e) {
    e.preventDefault();
    handleDeleteMovies(card._id)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  function saveMovies() {
    if (inputValue) {
      return;
    }
    handleSaveMovies(card)
      .then((res) => {
        if (res?.includes("Ошибка")) {
          alert(
            "Простите карточка не может быть добавлена в сохраненное.. Что-то пошло не так.. ("
          );
          setInputValue(false);
          return;
        } else {
          setInputValue(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setInputValue(isSaved);
  }, [isSaved]);

  return (
    <li className="card">
      <a
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
        className="card__link"
      >
        <article className="card__arcticle">
          <img className="card__image" alt={card.nameRU} src={cardUrl} />
          <div className="card__body">
            <div className="card__line">
              <h2 className="card__title">{card.nameRU}</h2>
              {isSavedPage ? (
                <button
                  className="card__btn-delete"
                  type="button"
                  onClick={deleteMovies}
                ></button>
              ) : (
                <input
                  type="checkbox"
                  className="card__checkbox"
                  checked={inputValue}
                  onChange={saveMovies}
                />
              )}
            </div>
            <p className="card__info-time">{durationTime()}</p>
          </div>
        </article>
      </a>
    </li>
  );
}

export default MoviesCard;
