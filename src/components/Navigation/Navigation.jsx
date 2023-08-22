import { useState, useEffect } from "react";
import "./Navigation.css";
import { useLocation, NavLink } from "react-router-dom";
import { ReactComponent as IconMenu } from "../../images/menu-btn.svg";
import { ReactComponent as IconClose } from "../../images/close-btn.svg";

function Navigation({ logo, loggedIn = false }) {
  const [isOpen, setOpen] = useState();
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {!loggedIn ? (
        <nav>
          <ul className="list menu">
            <li className="menu__item">
              <NavLink to="/signup" className="menu__link  link_color_white">
                Регистрация
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/signin" className="btn menu__link menu__btn btn">
                Войти
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <>
          <nav className="desctop-menu">
            <ul className="list menu-movies">
              <li>
                <NavLink
                  to="/movies"
                  className="menu-movies__link link_color_white"
                >
                  Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/saved-movies"
                  className="menu-movies__link link_color_white"
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
          </nav>
          <nav className="desctop-menu">
            <ul className="list menu-account">
              <li>
                <NavLink
                  to="/profile"
                  className="menu-account__link link_color_white "
                >
                  <span>Аккаунт</span>
                  <div className="menu-account__image"></div>
                </NavLink>
              </li>
            </ul>
          </nav>
          <nav className={`mobile-menu ${isOpen ? "mobile-menu__active" : ""}`}>
            <ul className="list mobile-menu__movies">
              <li>
                <NavLink to="/" className="link_color_white">
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink to="/movies" className="link_color_white">
                  Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink to="/saved-movies" className="link_color_white">
                  Сохранённые фильмы
                </NavLink>
              </li>
              <li className="mobile-menu__link menu-account">
                <NavLink
                  to="/profile"
                  className="menu-account__link link_color_white "
                >
                  <span>Аккаунт</span>
                  <div className="menu-account__image"></div>
                </NavLink>
              </li>
            </ul>
          </nav>
        </>
      )}
      {loggedIn && (
        <button
          type="button"
          className="header-btn"
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <div className="icon-close">
              <IconClose />
            </div>
          ) : (
            <IconMenu />
          )}
        </button>
      )}
    </>
  );
}

export default Navigation;
