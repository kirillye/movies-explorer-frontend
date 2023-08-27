import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useEffect, useState } from "react";
import NotFoundError from "../NotFoundError/NotFoundError";
import Preloader from "../Preloader/Preloader";
import { useContext } from "react";
import { type } from "@testing-library/user-event/dist/type";

function SavedMovies({ savedMovies, handleDeleteMovies }) {
  // статус загрузки
  const [isLoading, setIsLoading] = useState(false);
  // если ничего не найдено
  const [errorNotFound, setErrorNotFound] = useState(false);
  // чекбокс
  const [isShortMovies, setIsShortMovies] = useState(false);
  // была ли инициарована загрузка карточек
  const [isLoaded, setIsLoaded] = useState(false);

  // список сохраненных фильмов
  const [savedMoviesListShow, setSavedMoviesListShow] = useState(savedMovies);
  // список отфильтрованных фильмов
  const [filtredMovies, setIsFiltredMovies] = useState([savedMoviesListShow]);

  function filterByDuration(listMovies) {
    return listMovies.filter((item) => item.duration < 40);
  }

  function filterForMovies(movies, query = "", checkbox) {
    const moviesByUserQuery = movies.filter((card) => {
      const ru = String(card.nameRU).toLowerCase().trim();
      const en = String(card.nameEN).toLowerCase().trim();
      const Movies = query.toLowerCase().trim();
      return ru.indexOf(Movies) !== -1 || en.indexOf(Movies) !== -1;
    });
    if (checkbox === "true" || checkbox === true) {
      return filterByDuration(moviesByUserQuery);
    } else {
      return moviesByUserQuery;
    }
  }

  // функция поиска
  function handleSearch(inputValue, checkbox) {
    localStorage.setItem(`shortSaveMovies`, checkbox);
    const moviesList = filterForMovies(savedMovies, inputValue, checkbox);
    localStorage.setItem(`moviesSavedSearch`, inputValue);
    if (!moviesList.length) {
      setErrorNotFound(true);
    } else {
      setErrorNotFound(false);
      setIsFiltredMovies(moviesList);
      setSavedMoviesListShow(moviesList);
    }
  }

  function handleShortMovies(checkbox) {
    setIsShortMovies(checkbox);
    if (!isShortMovies) {
      localStorage.setItem(`shortSaveMovies`, true);
      setSavedMoviesListShow(filterByDuration(filtredMovies));
      filterByDuration(filtredMovies).length === 0
        ? setErrorNotFound(true)
        : setErrorNotFound(false);
    } else {
      localStorage.setItem(`shortSaveMovies`, false);
      filtredMovies.length === 0
        ? setErrorNotFound(true)
        : setErrorNotFound(false);
      setSavedMoviesListShow(filtredMovies);
    }
  }

  // проверка чекбокса в локальном хранилище
  useEffect(() => {
    const query = localStorage.getItem("moviesSavedSearch");
    const checkBox = localStorage.getItem("shortSaveMovies");
    if (query) {
      setSavedMoviesListShow(filterForMovies(savedMovies, query, checkBox));
    }
    if (checkBox) {
      // setSavedMoviesListShow(filterByDuration(savedMoviesListShow));
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, [savedMovies]);

  useEffect(() => {
    // console.log(savedMovies.length, savedMoviesListShow.length);
    if (!savedMovies.length) {
      setErrorNotFound(true);
    } else {
      setErrorNotFound(false);
    }
    if (!savedMoviesListShow.length) {
      setErrorNotFound(true);
    }
  }, [savedMovies, savedMoviesListShow]);

  return (
    <main className="main">
      <SearchForm
        isSavedPage={true}
        handleSearch={handleSearch}
        handleShortInput={handleShortMovies}
        isShortMovies={isShortMovies}
        setIsLoaded={setIsLoaded}
      />
      {errorNotFound ? (
        <NotFoundError />
      ) : (
        <>
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              isSavedPage={true}
              savedMovies={savedMovies}
              allMovies={savedMoviesListShow}
              handleDeleteMovies={handleDeleteMovies}
            />
          )}
        </>
      )}
    </main>
  );
}

export default SavedMovies;
