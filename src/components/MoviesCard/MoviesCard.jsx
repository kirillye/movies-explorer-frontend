import "./MoviesCard.css";
import imageContent from "../../images/image-content.jpg";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({
  savedCard = {
    isSaved: false,
    id: null,
  },
  isSavedPage = false,
  card,
  handleSaveMovies,
  handleDeleteMovies,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [inputValue, setInputValue] = useState(savedCard.isSaved);
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

  function handleClickDeleteBtn(e) {
    e.preventDefault();
    deleteMovies(card._id);
  }

  function deleteMovies(id) {
    handleDeleteMovies(id)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  function saveMovies() {
    if (inputValue) {
      deleteMovies(savedCard.id);
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
    setInputValue(savedCard.isSaved);
  }, [savedCard]);

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
                  onClick={handleClickDeleteBtn}
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
