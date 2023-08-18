import "./Profile.css";
import { Link } from "react-router-dom";

function Profile({ userName = "Кирилл", userEmail = "user-email.ru" }) {
  return (
    <main className="main">
      <section className="user container-mini">
        <div className="user__body">
          <h1 className="user__title">Привет, {userName}</h1>
          <div className="user__info">
            <ul className="list user-list-info">
              <li>Имя</li>
              <li>{userName}</li>
            </ul>
            <ul className="list user-list-info">
              <li>Email</li>
              <li>{userEmail}</li>
            </ul>
          </div>
        </div>
        <nav>
          <ul className="user__navigation list">
            <li className="user__navigation-item">
              <button
                type="button"
                className="user__navigation-btn link_color_white"
              >
                Редактировать
              </button>
            </li>
            <li>
              <Link
                to="/"
                className="user__navigation-btn user__navigation-exit"
              >
                Выйти из аккаунта
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </main>
  );
}

export default Profile;
