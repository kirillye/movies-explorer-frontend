// import { useState } from "react";
import "./Promo.css";
import imageWorld from "../../images/landing-logo.svg";
import NavTab from "../NavTab/NavTab";

function Promo() {
  return (
    <section className="promo">
      <div className="container promo__content">
        <div className="promo__body">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <h2 className="promo__sub-title">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </h2>
          <NavTab />
        </div>
        <div className="promo__image">
          <img
            src={imageWorld}
            alt="Планета разработки"
            className="promo__img-baground"
          />
        </div>
      </div>
    </section>
  );
}

export default Promo;
