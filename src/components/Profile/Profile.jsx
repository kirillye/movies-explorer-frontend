import "./Profile.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function Profile({ userData }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: userData.name,
      email: userData.email,
    },
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    console.log("Форма успешно отправлена");
    reset();
  };

  return (
    <main className="main">
      <section className="user container-mini user__container">
        <h1 className="user__title">Привет, {userData.name}</h1>
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
                className={`form-profile__input ${
                  errors?.name ? "form-profile__input-error" : ""
                }`}
                type="text"
              />
            </label>
            {errors?.name && (
              <p className="form-profile__err-message">
                {errors?.name.message || "Что-то пошло не так..."}
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
                className={`form-profile__input ${
                  errors?.email ? "form-profile__input-error" : ""
                }`}
                type="email"
              />
            </label>
            {errors?.email && (
              <p className="form-profile__err-message">
                {errors?.email.message || "Что-то пошло не так..."}
              </p>
            )}
          </div>
          <ul className="list">
            <li className="form-profile__btn-li">
              <button
                type="submit"
                className="form-profile__btn-submit link_color_white"
              >
                Редактировать
              </button>
            </li>
            <li className="form-profile__btn-li">
              <Link to="/" className="form-profile__btn-exit">
                Выйти из аккаунта
              </Link>
            </li>
          </ul>
        </form>
      </section>
    </main>
  );
}

export default Profile;
