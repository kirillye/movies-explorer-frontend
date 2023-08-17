import { useState } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

function Header({ logo, loggedIn }) {
  const [isActiveMenuMobile, setIsActiveMenuMobile] = useState(false);
  function handleClickBurger() {
    setIsActiveMenuMobile((current) => !current);
  }

  return (
    <>
      <header
        className={`header ${
          loggedIn ? "header-bg_color_none" : "header-bg_color_blue"
        }`}
      >
        <div className="container-padding-small">
          <div className="header__up">
            <Link to="/" className="menu__link link_color_white">
              <img src={logo} alt="Логотип" className="logo" />
            </Link>
            <Navigation loggedIn={loggedIn} />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
