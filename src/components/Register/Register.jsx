import "./Register.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Register({ logo, handleRegister }) {
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
    const email = data.email;
    const password = data.password;
    const name = data.userName;
    handleRegister(email, password, name)
      .then((res) => {
        if (res == "Ошибка: 409") {
          return setErrorMessage("Email уже зарегистрирован");
        }
        if (typeof res && res?.includes("Ошибка")) {
          return setErrorMessage("Что-то пошло не так.. (");
        }
        setErrorMessage(null);
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="main">
      <section className="container-mini login">
        <Link to="/" className="login__logo">
          <img src={logo} alt="Логотип" className="logo login__logo-image" />
        </Link>
        <h1 className="login__title">Добро пожаловать!</h1>
        <form className="form-aut" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-body">
            <label className="text-field__label" htmlFor="userName">
              Имя
            </label>
            <input
              {...register("userName", {
                required: "Поле обязательно к заполнению",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа", // JS only: <p>error message</p> TS only support string
                },
                maxLength: {
                  value: 30,
                  message: "Максимум 30 символов", // JS only: <p>error message</p> TS only support string
                },
              })}
              placeholder="Имя"
              type="text"
              className={`form-aut__input form-aut__input-user ${
                errors?.userName ? "form-aut__input-error" : ""
              }`}
              id="userName"
            />
            {errors?.userName && (
              <p className="form-aut__err-message">
                {errors?.userName.message || "Что-то пошло не так..."}
              </p>
            )}
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
              className={`form-aut__btn btn ${
                (isSubmitting || !isValid) && "form-aut__btn-login_blocked"
              }`}
              disabled={(isSubmitting || !isValid) && true}
            >
              {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
            </button>
            <span className="info-autorization__alert">
              Уже зарегистрированы ?
            </span>
            <Link to={"/signin"} className="info-autorization__btn">
              Войти
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Register;
