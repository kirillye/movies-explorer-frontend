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
            <MoviesCard isSavedPage={isSavedPage} />
            <MoviesCard isSavedPage={isSavedPage} />
            <MoviesCard isSavedPage={isSavedPage} />
            <MoviesCard isSavedPage={isSavedPage} />
            <MoviesCard isSavedPage={isSavedPage} />
            <MoviesCard isSavedPage={isSavedPage} />
            <MoviesCard isSavedPage={isSavedPage} />
            <MoviesCard isSavedPage={isSavedPage} />
          </ul>
        )}
        <div className="block-btn">
          <button className="block-btn__button btn">Ещё</button>
        </div>
      </section>
    </>
  );
}

export default MoviesCardList;
