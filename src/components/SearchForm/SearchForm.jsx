import "./SearchForm.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

function SearchForm() {
  const {
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const [errorMessage, setErrorMessage] = useState("");

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
                type="checkbox"
                id="switch"
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
