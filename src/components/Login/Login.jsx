import "./Login.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login({ logo }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    console.log("Форма успешно отправлена");
    reset();
  };

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
            <button
              type="submit"
              className="form-aut__btn btn form-aut__btn-login"
            >
              Войти
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
