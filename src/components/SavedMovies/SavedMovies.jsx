import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useEffect, useState } from "react";
import NotFoundError from "../NotFoundError/NotFoundError";
import Preloader from "../Preloader/Preloader";
import { useContext } from "react";

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

  function filterForMovies(movies, query, checkbox) {
    const moviesByUserQuery = movies.filter((card) => {
      const ru = String(card.nameRU).toLowerCase().trim();
      const en = String(card.nameEN).toLowerCase().trim();
      const Movies = query.toLowerCase().trim();
      return ru.indexOf(Movies) !== -1 || en.indexOf(Movies) !== -1;
    });

    if (checkbox) {
      return filterByDuration(moviesByUserQuery);
    } else {
      return moviesByUserQuery;
    }
  }

  // функция поиска
  function handleSearch(inputValue, checkbox) {
    localStorage.setItem(`shortSaveMovies`, checkbox);
    const moviesList = filterForMovies(savedMovies, inputValue, checkbox);
    localStorage.setItem(`listSavedMovies`, JSON.stringify(moviesList));
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

  useEffect(() => {
    localStorage.setItem(`listSavedMovies`, JSON.stringify(savedMovies));
  }, [savedMovies]);

  // подгружаем фильмы из локального хранилища
  useEffect(() => {
    if (localStorage.getItem(`listSavedMovies`)) {
      const movies = JSON.parse(localStorage.getItem(`listSavedMovies`));
      if (!movies.length) {
        setErrorNotFound(true);
      }
      setSavedMoviesListShow(movies);
      if (localStorage.getItem(`shortSaveMovies`) === true) {
        setIsFiltredMovies(filterByDuration(movies));
      } else {
        setIsFiltredMovies(movies);
      }
    }
  }, [savedMovies]);

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
              savedMovies={savedMoviesListShow}
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
