import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainLogo from "../../images/logo.svg";
import { api } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { authentication } from "../../utils/authentication";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import "./App.css";

function App() {
  const userData = {
    name: "Кирилл",
    email: "kirill.stalker.2011@mail.ru",
  };

  // информция из бд
  const [currentUser, setCurrentUser] = useState({});
  const [moviesList, setMoviesList] = useState([]);

  // авторизация
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  // собираем ошибки
  const [regStatus, setRegStatus] = useState({
    messageError: "",
    isError: true,
  });

  // Работа с карточками

  const LG_ROW_CARD_COUNT = 4;
  const MD_ROW_CARD_COUNT = 3;
  const SM_ROW_CARD_COUNT = 2;

  const LG_INITIAL_CARD_COUNT = 12;
  const MD_INITIAL_CARD_COUNT = 9;
  const SM_INITIAL_CARD_COUNT = 6;

  const navigate = useNavigate();

  // ============ Функции для работы с карточками фильмов  ============

  // все фильмы
  const handleCards = () => {
    moviesApi
      .getCards()
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        return err;
      });
  };

  // Избранные

  //  ============ Функции авторизации/актуализации данных пользователя  ============

  const tokenCheck = () => {
    authentication
      .tokenCheck()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/", { replace: true });
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        // console.log(`Произошла ${err}: ${err.massage}`);
        console.log(`Токен не индефицирован, требуется авторизация`);
      });
  };

  const handleRegister = (email, password, name) => {
    return authentication
      .signUp(email, password, name)
      .then((res) => {
        setRegStatus({
          messageError: "",
          isError: false,
        });
        setTimeout(() => {
          navigate("/signin", { replace: true });
        }, 1000);
      })
      .catch((err) => {
        setRegStatus({
          messageError: "",
          isError: true,
        });
        return err;
      });
  };

  const handleLogin = (userEmail, userPassword) => {
    return authentication
      .signIn(userEmail, userPassword)
      .then((res) => {
        console.log(res);
        // setLoggedIn(true);
        // localStorage.setItem("email", userEmail);
        // setEmail(userEmail);
        // navigate("/", { replace: true });
      })
      .catch((err) => {
        return err;
      });
  };

  // Загрузка фильмов
  //   useEffect(() => {
  //   if (loggedIn && currentUser) {
  //     Promise.all([api.getUserInfo()])
  //       .then(([userData]) => {
  //         // const { user } = userData;
  //         console.log(userData);
  //         // handleCardsChange(cards);
  //         // setCurrentUser(user);
  //       })
  //       .catch((err) => console.error(err));
  //     // .finally(() => {
  //     //   setIsLoading(false);
  //     // });
  //   } else {
  //     // setIsLoading(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentUser, loggedIn]);

  // useEffect(() => {
  //   // setIsLoading(true);
  //   tokenCheck();
  //   // if (loggedIn) {
  //   //   Promise.all([api.getUserInfo()])
  //   //     .then(([userData]) => {
  //   //       // const { user } = userData;
  //   //       console.log(userData);
  //   //       // handleCardsChange(cards);
  //   //       // setCurrentUser(user);
  //   //     })
  //   //     .catch((err) => console.error(err));
  //   //   // .finally(() => {
  //   //   //   setIsLoading(false);
  //   //   // });
  //   // } else {
  //   //   // setIsLoading(false);
  //   // }
  //   // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header logo={mainLogo} loggedIn={loggedIn} />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={
                <>
                  <Header logo={mainLogo} loggedIn={loggedIn} />
                  <Movies handleCards={handleCards} />
                  <Footer />
                </>
              }
            ></ProtectedRoute>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={
                <>
                  <Header logo={mainLogo} loggedIn={loggedIn} />
                  <SavedMovies />
                  <Footer />
                </>
              }
            ></ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={
                <>
                  <Header logo={mainLogo} loggedIn={loggedIn} />
                  <Profile userData={userData} />
                </>
              }
            ></ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={<Login logo={mainLogo} handleLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<Register logo={mainLogo} handleRegister={handleRegister} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
