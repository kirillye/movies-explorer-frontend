import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ isLoading, isSavedPage }) {
  return (
    <>
      <section className="movies container-padding-small">
        {isLoading ? (
          <Preloader />
        ) : (
          <ul className="list movies__grid">
            <MoviesCard
              isSavedPage={isSavedPage}
              name="33 слова о дизайне и почему это так важно"
            />
            <MoviesCard
              isSavedPage={isSavedPage}
              name="Описание одного очень интересного фильма"
            />
            <MoviesCard
              isSavedPage={isSavedPage}
              name="Разговоры о важном. Фильм о самом главном"
            />
            <MoviesCard
              isSavedPage={isSavedPage}
              name="Не откладывай а делай сегодня!"
            />
            <MoviesCard
              isSavedPage={isSavedPage}
              name="Время летит так быстро, лови момент"
            />
            <MoviesCard
              isSavedPage={isSavedPage}
              name="Культовый фильм родом из 90x"
            />
            <MoviesCard isSavedPage={isSavedPage} name="Фильм Киборг-убийца" />
            <MoviesCard isSavedPage={isSavedPage} name="Фильм Один дома 2" />
          </ul>
        )}
        <div className="block-btn">
          <button className="block-btn__button btn" type="button">
            Ещё
          </button>
        </div>
      </section>
    </>
  );
}

export default MoviesCardList;
