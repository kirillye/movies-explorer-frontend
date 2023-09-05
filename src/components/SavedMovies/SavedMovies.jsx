import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useEffect, useState } from "react";
import NotFoundError from "../NotFoundError/NotFoundError";
import Preloader from "../Preloader/Preloader";
import { filterForMovies, filterByDuration } from "../../utils/constants";

function SavedMovies({ savedMovies, handleDeleteMovies }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [errorNotFound, setErrorNotFound] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // статус загрузки
  const [isLoading, setIsLoading] = useState(false);

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  useEffect(() => {
    const moviesList = filterForMovies(savedMovies, searchQuery);
    setFilteredMovies(
      isShortMovies ? filterByDuration(moviesList) : moviesList
    );
  }, [savedMovies, isShortMovies, searchQuery]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setErrorNotFound(true);
    } else {
      setErrorNotFound(false);
    }
  }, [filteredMovies]);

  return (
    <main className="main">
      <SearchForm
        isSavedPage={true}
        handleShortMovies={handleShortMovies}
        handleSearch={handleSearch}
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
              allMovies={filteredMovies}
              handleDeleteMovies={handleDeleteMovies}
            />
          )}
        </>
      )}
    </main>
  );
}

export default SavedMovies;
