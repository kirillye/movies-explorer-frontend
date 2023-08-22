import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <main className="main">
        <section className="not-found container">
          <div className="not-found__body">
            <span className="not-found__error-number">404</span>
            <h1 className="not-found__title">Страница не найдена</h1>
          </div>
          <button
            className="not-found__btn"
            type="button"
            onClick={() => navigate(-1)}
          >
            Назад
          </button>
        </section>
      </main>
    </>
  );
}

export default NotFound;
