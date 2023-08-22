// import { useState } from "react";
// import "./Form.css";

// export default function Form({
//   btnTextInfo,
//   handleSubmit,
//   handleChange,
//   name,
//   errorMessage,
// }) {
//   const [userEmail, setUserEmail] = useState("");
//   const [userPassword, setUserPassword] = useState("");

//   function handleUserEmailChange(event) {
//     setUserEmail(event.target.value);
//     handleChange(event);
//   }

//   function handleUserPasswordChange(event) {
//     setUserPassword(event.target.value);
//     handleChange(event);
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       action="#"
//       className="form-aut"
//       name={name}
//       noValidate=""
//     >
//       <label class="text-field__label" for="userEmail">
//         E-mail
//       </label>
//       <input
//         name="userEmail"
//         placeholder="Email"
//         type="email"
//         className="form-aut__input form-aut__input-email"
//         required
//         value={userEmail}
//         id="userEmail"
//       />
//       <label class="text-field__label" for="userPassword">
//         Пароль
//       </label>
//       <input
//         name="userPassword"
//         placeholder="Пароль"
//         type="password"
//         className="form-aut__input"
//         required
//         value={userPassword}
//         id="userPassword"
//       />
//       <p className="form-aut__err-message">{errorMessage}</p>
//       <button
//         type="submit"
//         className="form-aut__btn btn"
//         onSubmit={handleSubmit}
//       >
//         Войти
//       </button>
//     </form>
//   );
// }
