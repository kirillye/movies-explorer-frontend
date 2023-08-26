import "./Login.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function Login({ logo, handleLogin }) {
  const {
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data) => {
    const userEmail = data.email;
    const userPassword = data.password;
    handleLogin(userEmail, userPassword)
      .then((res) => {
        if (typeof res && res?.includes("логин")) {
          return setErrorMessage("Логин или пароль не верен");
        }
        if (typeof res && res?.includes("пароль")) {
          return setErrorMessage("Логин или пароль не верен");
        }
        if (typeof res && res?.includes("Ошибка")) {
          return setErrorMessage("Что-то пошло не так.. (");
        }
        setErrorMessage(null);
        reset();
      })
      .catch((err) => {
        if (err === "Ошибка: 401") {
          return setErrorMessage("Логин или пароль не верен");
        }
        setErrorMessage(err);
      });
  };

  // function onSubmit(data) {
  //   // return promise that resolves after 2 seconds
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, 2000);
  //   });
  // }

  return (
    <main className="main">
      <section className="container-mini login">
        <Link to="/" className="login__logo">
          <img src={logo} alt="Логотип" className="logo login__logo-image" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="form-aut" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-body">
            <label className="text-field__label" htmlFor="userEmail">
              E-mail
            </label>
            <input
              {...register("email", {
                required: "Поле обязательно к заполнению",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                  message: "email указан некорректно",
                },
              })}
              placeholder="Email"
              type="email"
              className={`form-aut__input form-aut__input-email ${
                errors?.email ? "form-aut__input-error" : ""
              }`}
              id="userEmail"
            />
            {errors?.email && (
              <p className="form-aut__err-message">
                {errors?.email.message || "Что-то пошло не так..."}
              </p>
            )}
            <label className="text-field__label" htmlFor="userPassword">
              Пароль
            </label>
            <input
              {...register("password", {
                required: "Поле обязательно к заполнению",
                minLength: {
                  value: 8,
                  message: "Минимум 8 символа", // JS only: <p>error message</p> TS only support string
                },
              })}
              placeholder="Пароль"
              type="password"
              className={`form-aut__input ${
                errors?.password ? "form-aut__input-error" : ""
              }`}
              id="userPassword"
            />
            {errors?.password && (
              <p className="form-aut__err-message">
                {errors?.password.message || "Что-то пошло не так..."}
              </p>
            )}
          </div>
          <div className="info-autorization">
            {errorMessage && (
              <p className="info-autorization__error">{errorMessage}</p>
            )}
            <button
              type="submit"
              disabled={(isSubmitting || !isValid) && true}
              className={`form-aut__btn btn form-aut__btn-login ${
                (isSubmitting || !isValid) && "form-aut__btn-login_blocked"
              }`}
            >
              {isSubmitting ? "Авторизация..." : "Войти"}
            </button>
            <span className="info-autorization__alert">
              Ещё не зарегистрированы?
            </span>
            <Link to={"/signup"} className="info-autorization__btn">
              Регистрация
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
