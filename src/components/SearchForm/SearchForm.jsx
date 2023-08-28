import "./SearchForm.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SearchForm({
  isSavedPage = false,
  handleSearch,
  handleShortMovies,
  isShortMovies,
  setIsLoaded,
  onSearchMovies,
}) {
  // Достаем данные пользователя из контекста
  const currentUser = useContext(CurrentUserContext);

  const {
    register,
    setValue,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      const val = handleSearch(data.movies, data.checkbox);
      resolve(val);
    });
  };

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const moviesSearchValue = localStorage.getItem("moviesSearch") || "";
    const moviesSavedSearchValue = localStorage.getItem("moviesSavedSearch");
    if (!isSavedPage && localStorage.getItem("shortMovies") === "true") {
      setValue("checkbox", true);
    }

    if (!isSavedPage && moviesSearchValue) {
      setValue("movies", moviesSearchValue);
    }
  }, []);

  return (
    <section className="search">
      <div className="container-padding-small search__body">
        <form
          action="search__form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="search__line-input">
            <input
              {...register("movies", {
                required: "Нужно ввести ключевое слово",
              })}
              type="text"
              placeholder="Фильм"
              disabled={isSubmitting ? "disabled" : ""}
              className={`search__input ${
                errors?.movies ? "search__input_error" : ""
              }`}
              required
            />
            <button
              type="submit"
              className="search__btn"
              disabled={(isSubmitting || !isValid) && true}
            ></button>
          </div>
          <div className="search__line-switch">
            {errors?.movies && (
              <p className="search__err-message">
                {errors?.movies.message || "Что-то пошло не так..."}
              </p>
            )}
            <div className="search__box">
              <input
                {...register("checkbox")}
                onChange={(e) => {
                  setValue("checkbox", e.target.checked);
                  handleShortMovies(e.target.checked);
                }}
                type="checkbox"
                id="switch"
                disabled={isSubmitting ? "disabled" : ""}
                className="search__switch"
              />
              <label htmlFor="switch" className="search__switch-label"></label>
              <label htmlFor="switch" className="search__switch-info">
                Короткометражки
              </label>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
