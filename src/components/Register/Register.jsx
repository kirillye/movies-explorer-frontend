import "./Register.css";
import Form from "../Form/Form";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ logo }) {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <main className="main">
      <div className="container-mini login">
        <div className="login__body">
          <Link to="/" className="login__logo">
            <img src={logo} alt="Логотип" className="logo login__logo-image" />
          </Link>
          <h1 className="login__title">Добро пожаловать!</h1>
          <form className="form-aut" onSubmit={handleSubmit}>
            <label className="text-field__label" htmlFor="userName">
              Имя
            </label>
            <input
              name="userName"
              placeholder="Имя"
              type="text"
              className="form-aut__input form-aut__input-user"
              id="userName"
              required
            />
            <label className="text-field__label" htmlFor="userEmail">
              E-mail
            </label>
            <input
              name="userEmail"
              placeholder="Email"
              type="email"
              className="form-aut__input form-aut__input-email"
              required
              id="userEmail"
            />
            <label className="text-field__label" htmlFor="userPassword">
              Пароль
            </label>
            <input
              name="userPassword"
              placeholder="Пароль"
              type="password"
              className="form-aut__input"
              required
              id="userPassword"
            />
            <p className="form-aut__err-message">{}</p>
          </form>
        </div>
        <div className="login__navigation">
          <div className="info-autorization">
            <button type="submit" className="form-aut__btn btn">
              Зарегистрироваться
            </button>
            <span className="info-autorization__alert">
              Уже зарегистрированы ?
            </span>
            <Link to={"/signin"} className="info-autorization__btn">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
