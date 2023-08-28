import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import NotFoundError from "../NotFoundError/NotFoundError";
import { filterForMovies, filterByDuration } from "../../utils/constants";

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

  // function handleShortMovies(status) {
  //   setIsShortMovies(status);
  // }

  function handleShortMovies(checkbox) {
    setIsShortMovies(checkbox);
    if (!isShortMovies) {
      localStorage.setItem(`shortMovies`, true);
      setMoviesFiltred(filterByDuration(moviesListInitial));
      filterByDuration(moviesFiltred).length === 0
        ? setErrorNotFound(true)
        : setErrorNotFound(false);
    } else {
      localStorage.setItem(`shortMovies`, false);
      moviesFiltred.length === 0
        ? setErrorNotFound(true)
        : setErrorNotFound(false);
      setMoviesFiltred(moviesListInitial);
    }
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
    localStorage.setItem("movies", JSON.stringify(list));
  }

  // поиск по запросу
  function handleSearch(inputValue, checkbox) {
    localStorage.setItem("moviesSearch", inputValue);
    localStorage.setItem("shortMovies", checkbox);
    if (allMovies.length === 0) {
      setIsLoading(true);
      return handleCards()
        .then((movies) => {
          // localStorage.setItem("movies", JSON.stringify(movies));
          setAllMovies(movies);
          handleFilteredMovies(movies, inputValue, checkbox);
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

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      // handleShortMovies(true);
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, []);

  // подгружаем фильмы из локального хранилища
  useEffect(() => {
    if (localStorage.getItem(`movies`)) {
      const movies = JSON.parse(localStorage.getItem(`movies`));
      setMoviesListInitial(movies);
      if (localStorage.getItem("shortMovies") === "true") {
        setMoviesFiltred(filterByDuration(movies));
      } else {
        setMoviesFiltred(movies);
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (moviesFiltred.length === 0) {
        setErrorNotFound(true);
      } else {
        setErrorNotFound(false);
      }
    } else {
      setErrorNotFound(false);
    }
  }, [moviesFiltred]);

  return (
    <main className="main">
      <SearchForm
        handleSearch={handleSearch}
        setIsLoaded={setIsLoaded}
        handleShortMovies={handleShortMovies}
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
