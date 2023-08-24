import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState, useEffect } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { DEVICE_SIZE_WINDOWS } from "../../utils/constants";

function MoviesCardList({ isLoading, isSavedPage, handleCards, allMovies }) {
  const widthScreen = useMediaQuery();
  // const [isLoading, setLoading] = useState(false);
  // const [allMovies, setAllMovies] = useState(null);
  // const [error, setError] = useState(null);
  // const [filter, setFilter] = useState(null);
  // const [liked, setLiked] = useState(null);
  const [cards, setCards] = useState(null);

  const isDesktop = useMediaQuery("(min-width: 1100px)");
  const isTablet = useMediaQuery("(min-width: 460px)");

  // переменные значения количества карточек

  const cardColumnCount = isDesktop
    ? DEVICE_SIZE_WINDOWS.desctop.ROW_CARD_COUNT
    : isTablet
    ? DEVICE_SIZE_WINDOWS.laptop.ROW_CARD_COUNT
    : DEVICE_SIZE_WINDOWS.mobile.ROW_CARD_COUNT;

  const initialCardCount = isDesktop
    ? DEVICE_SIZE_WINDOWS.desctop.INITIAL_CARD_COUNT
    : isTablet
    ? DEVICE_SIZE_WINDOWS.laptop.INITIAL_CARD_COUNT
    : DEVICE_SIZE_WINDOWS.mobile.INITIAL_CARD_COUNT;

  // переменные значения количества карточек
  const [visibleCardCount, setVisibleCardCount] = useState(initialCardCount);
  const roundedVisibleCardCount =
    Math.floor(visibleCardCount / cardColumnCount) * cardColumnCount;

  // useEffect(() => {
  //   fetch("https://api.nomoreparties.co/beatfilm-movies")
  //     .then((response) => response.json())
  //     .then((card) => {
  //       setCards(card);
  //       console.log(roundedVisibleCardCount);
  //     });
  // }, [widthScreen]);

  const handleClick = () => {
    calculateCardCount();
  };

  const calculateCardCount = () => {
    if (isDesktop) {
      return setVisibleCardCount(
        visibleCardCount + DEVICE_SIZE_WINDOWS.desctop.ROW_CARD_COUNT
      );
    }

    if (isTablet) {
      return setVisibleCardCount(
        visibleCardCount + DEVICE_SIZE_WINDOWS.laptop.ROW_CARD_COUNT
      );
    }

    setVisibleCardCount(
      visibleCardCount + DEVICE_SIZE_WINDOWS.mobile.ROW_CARD_COUNT
    );
  };

  return (
    <>
      <section className="movies container-padding-small">
        {isLoading ? (
          <Preloader />
        ) : (
          <ul className="list movies__grid">
            {allMovies?.slice(0, roundedVisibleCardCount).map((card) => (
              // <li className="list__item" key={card.id}></li>
              <MoviesCard
                isSavedPage={isSavedPage}
                key={card.id}
                cardInfo={card}
              />
            ))}
          </ul>
        )}
        <div className="block-btn">
          <button
            className="block-btn__button btn"
            type="button"
            onClick={handleClick}
          >
            Ещё
          </button>
        </div>
      </section>
    </>
  );
}

export default MoviesCardList;
