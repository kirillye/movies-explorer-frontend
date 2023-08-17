import "./Profile.css";

function Profile({ userName = "Пользователь", userEmail = "user-email.ru" }) {
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
              <button type="button" className="user__navigation-btn ">
                Редактировать
              </button>
            </li>
            <li>
              <button
                type="button"
                className="user__navigation-btn user__navigation-exit"
              >
                Выйти из аккаунта
              </button>
            </li>
          </ul>
        </nav>
      </section>
    </main>
  );
}

export default Profile;
