import "./Profile.css";
import { useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ handleLogOut, handleUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser.name;
  const userEmail = currentUser.email;
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    reset,
    formState: { errors, isSubmitting, isDirty },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: userName,
      email: userEmail,
    },
  });
  const onSubmit = (data) => {
    return new Promise((resolve) => {
      if (currentUser.name === data.name && currentUser.email === data.email) {
        setErrorMessage("Данные формы не были обновлены");
      } else {
        handleUpdateUser(data)
          .then((result) => {
            if (result === "Ошибка: 400") {
              return setErrorMessage(
                "Пользователь с такой электронной почтой уже существует"
              );
            }
            alert("данные обновлены");
            setErrorMessage("");
          })
          .catch((err) => {
            setErrorMessage(err);
            setErrorMessage("Что-то пошло не так, попробуйте чуть позже...");
          });
      }
    });
  };

  function signOut() {
    handleLogOut();
  }

  useEffect(() => {
    reset(currentUser);
  }, [currentUser]);

  return (
    <main className="main">
      <section className="user container-mini user__container">
        <h1 className="user__title">Привет, {currentUser.name}</h1>
        <form
          className="form-profile"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="form-profile__container">
            <label className="form-profile__label">
              <span className="form-profile__span">Имя</span>
              <input
                {...register("name", {
                  required: "Поле обязательно к заполнению",
                  minLength: {
                    value: 2,
                    message: "Минимум 2 символа", // JS only: <p>error message</p> TS only support string
                  },
                  maxLength: {
                    value: 30,
                    message: "Максимум 30 символов", // JS only: <p>error message</p> TS only support string
                  },
                })}
                disabled={isSubmitting ? "disabled" : ""}
                className={`form-profile__input ${
                  errors?.name ? "form-profile__input-error" : ""
                }`}
                type="text"
              />
            </label>
            {errors?.name && (
              <p className="form-profile__err-message">
                {errors?.name.message || "Проверьте заполнено ли поле"}
              </p>
            )}
            <label className="form-profile__label form-profile__last-label">
              <span className="form-profile__span">Email</span>
              <input
                {...register("email", {
                  required: "Поле обязательно к заполнению",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                    message: "email указан некорректно",
                  },
                })}
                disabled={isSubmitting ? "disabled" : ""}
                className={`form-profile__input ${
                  errors?.email ? "form-profile__input-error" : ""
                }`}
                type="email"
              />
            </label>
            {errors?.email && (
              <p className="form-profile__err-message">
                {errors?.email.message || "Проверьте заполнено ли поле"}
              </p>
            )}
            {errorMessage && (
              <p className="form-profile__err-message form-profile__info-allert">
                {errorMessage}
              </p>
            )}
          </div>
          <ul className="list">
            <li className="form-profile__btn-li">
              <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className={`form-profile__btn-submit link_color_white ${
                  (isSubmitting || !isDirty) && "form-profile__btn_blocked"
                }`}
              >
                {isSubmitting ? "Обновление..." : "Редактировать"}
              </button>
            </li>
            <li className="form-profile__btn-li">
              <button
                type="button"
                className="form-profile__btn-exit"
                onClick={signOut}
              >
                Выйти из аккаунта
              </button>
            </li>
          </ul>
        </form>
      </section>
    </main>
  );
}

export default Profile;
