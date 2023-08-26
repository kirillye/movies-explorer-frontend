import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState, useEffect } from "react";
// import { useMediaQuery } from "../../hooks/useMediaQuery";
import { DEVICE_SIZE_WINDOWS } from "../../utils/constants";
import { useWindowSize } from "@uidotdev/usehooks";
import { useLocation } from "react-router-dom";

function MoviesCardList({
  isLoading,
  isSavedPage,
  allMovies,
  savedMovies,
  handleSaveMovies,
  handleDeleteMovies,
  deleteMoviesFromLocal,
  setUpdate,
}) {
  const size = useWindowSize();
  const [isNotFound, setIsNotFound] = useState(false);
  const [isMount, setIsMount] = useState(true);
  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsShowDetails, setCardsShowDetails] = useState({
    INITIAL_CARD_COUNT: 12,
    ROW_CARD_COUNT: 3,
  });

  const startRenderList = showMovieList.length;
  const endRenderList = startRenderList + cardsShowDetails.ROW_CARD_COUNT;
  const isHaveMore = allMovies.length - startRenderList;

  // количество отображаемых карточек при разной ширине экрана
  useEffect(() => {
    if (!isSavedPage) {
      if (size.width > 1100) {
        setCardsShowDetails(DEVICE_SIZE_WINDOWS.desctop);
      } else if (size.width <= 1100 && size.width > 460) {
        setCardsShowDetails(DEVICE_SIZE_WINDOWS.laptop);
      } else {
        setCardsShowDetails(DEVICE_SIZE_WINDOWS.mobile);
      }
      return () => setIsMount(false);
    }
  }, [size.width, isMount]);

  // отслеживаем изменение экрана
  useEffect(() => {
    if (allMovies.length) {
      const res = allMovies.filter(
        (item, i) => i < cardsShowDetails.INITIAL_CARD_COUNT
      );
      setShowMovieList(res);
    }
    if (!isHaveMore) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [allMovies, cardsShowDetails.INITIAL_CARD_COUNT]);

  // подгружаем карточки
  function handleClickMoreMovies() {
    if (isHaveMore > 0) {
      const newCards = allMovies.slice(startRenderList, endRenderList);
      setShowMovieList([...showMovieList, ...newCards]);
    }
    if (!isHaveMore) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }

  function checkSavedMovies(savedMovies, movie) {
    const isSaved = savedMovies.find((item) => item.movieId === movie.id);
    if (isSaved) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <section className="movies container-padding-small">
        {isLoading ? (
          <Preloader />
        ) : (
          <ul className="list movies__grid">
            {showMovieList.map((card) => (
              <MoviesCard
                isSaved={checkSavedMovies(savedMovies, card)}
                isSavedPage={isSavedPage}
                key={card?.id || card._id}
                card={card}
                handleSaveMovies={handleSaveMovies}
                handleDeleteMovies={handleDeleteMovies}
                deleteMoviesFromLocal={deleteMoviesFromLocal}
                setUpdate={setUpdate}
              />
            ))}
          </ul>
        )}
        {!isNotFound && (
          <div className="block-btn">
            <button
              className="block-btn__button btn"
              type="button"
              onClick={handleClickMoreMovies}
            >
              Ещё
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default MoviesCardList;
