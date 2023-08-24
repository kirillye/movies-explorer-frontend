import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { moviesApi } from "../../utils/MoviesApi";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Movies({ handleCards }) {
  // Достаем данные пользователя из контекста
  const currentUser = useContext(CurrentUserContext);
  // статус чекбокса в поиске
  const [inputValueShort, setInputValueShort] = useState(false);
  // список фильмов при запросе
  const [moviesListInitial, setMoviesListInitial] = useState([]);
  // полный список фильмов
  const [allMovies, setAllMovies] = useState([]);
  // ошибки
  const [error, setError] = useState(null);
  // статус запроса
  const [isLoading, setIsLoading] = useState(false);

  function handleSearch(inputState) {
    setIsLoading(true);
    localStorage.clear();
    localStorage.setItem("Inveris@mail.ru", "fff");
    // localStorage.setItem("Inveris@mail.ru", inputValueShort);
    if (!allMovies) {
      moviesApi
        .getCards()
        .then((response) => response.json())
        .then((movies) => {
          console.log(movies);
          setAllMovies([movies]);
        })
        .catch((err) => {
          setError("Во время запроса произошла ошибка");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log("Ищем из того что есть");
    }
  }

  // подгружаем фильмы из локального хранилища
  useEffect(() => {}, [currentUser]);

  useEffect(() => {}, [currentUser]);

  useEffect(() => {
    handleSearch(false);
  }, []);

  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList handleCards={handleCards} movies={allMovies} />
    </main>
  );
}

export default Movies;
