import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { moviesApi } from "../../utils/MoviesApi";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import NotFoundError from "../NotFoundError/NotFoundError";

function Movies({
  handleDeleteMovies,
  handleCards,
  handleSaveMovies,
  savedMovies,
}) {
  // Достаем данные пользователя из контекста
  const currentUser = useContext(CurrentUserContext);
  // статус чекбокса в поиске
  const [isShortMovies, setIsShortMovies] = useState(null);
  // список фильмов при запросе
  const [moviesListInitial, setMoviesListInitial] = useState([]);
  // список фильмов отфильтрованных
  const [moviesFiltred, setMoviesFiltred] = useState([]);
  // полный список фильмов
  const [allMovies, setAllMovies] = useState([]);
  // ошибки
  const [error, setError] = useState(null);
  // статус запроса
  const [isLoading, setIsLoading] = useState(false);
  // была ли инициарована загрузка карточек
  const [isLoaded, setIsLoaded] = useState(false);
  // Ошибка при ненахождении
  const [errorNotFound, setErrorNotFound] = useState(false);
  // первая загрузка
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  function handleShortInput(status) {
    setIsShortMovies(status);
  }

  function handleFilteredMovies(movies, inputValue, checkbox) {
    const list = filterForMovies(movies, inputValue, checkbox);
    if (list.length === 0) {
      setErrorNotFound(true);
    } else {
      setErrorNotFound(false);
    }
    setMoviesListInitial(list);
    setMoviesFiltred(checkbox ? filterByDuration(list) : list);
    localStorage.setItem(`movies`, JSON.stringify(list));
  }

  // поиск по запросу
  function handleSearch(inputValue, checkbox) {
    localStorage.setItem(`moviesSearch`, inputValue);
    localStorage.setItem(`shortMovies`, checkbox);
    // localStorage.setItem("Inveris@mail.ru", inputValueShort);
    if (allMovies.length === 0) {
      setIsLoading(true);
      handleCards()
        .then((movies) => {
          setAllMovies(movies);
        })
        .catch((err) => {
          setError("Во время запроса произошла ошибка");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      handleFilteredMovies(allMovies, inputValue, checkbox);
    }
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

  function filterByDuration(listMovies) {
    return listMovies.filter((item) => item.duration < 40);
  }

  // подгружаем фильмы из локального хранилища
  useEffect(() => {
    if (localStorage.getItem(`movies`)) {
      const movies = JSON.parse(localStorage.getItem(`movies`));
      setMoviesListInitial(movies);
      if (localStorage.getItem(`shortMovies`) === true) {
        setMoviesFiltred(filterByDuration(movies));
      } else {
        setMoviesFiltred(movies);
      }
    }
  }, [currentUser, allMovies]);

  return (
    <main className="main">
      <SearchForm
        handleSearch={handleSearch}
        setIsLoaded={setIsLoaded}
        handleShortInput={handleShortInput}
        isShortMovies={isShortMovies}
      />
      {errorNotFound ? (
        <NotFoundError />
      ) : (
        <>
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              savedMovies={savedMovies}
              allMovies={moviesFiltred}
              handleDeleteMovies={handleDeleteMovies}
              handleSaveMovies={handleSaveMovies}
            />
          )}
        </>
      )}
    </main>
  );
}

export default Movies;
