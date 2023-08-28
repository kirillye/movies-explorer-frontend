import "./App.css";
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
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
import Anonymous from "../Anonymous/Anonymous";
import "./App.css";

function App() {
  const [savedMovies, setSavedMovies] = useState([]);

  // информция из бд
  const [currentUser, setCurrentUser] = useState({});
  const [moviesList, setMoviesList] = useState([]);

  // авторизация
  const [loggedIn, setLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ============ Функции для работы с карточками фильмов  ============

  // все фильмы
  const handleCards = () => {
    return moviesApi
      .getCards()
      .then((response) => response.json())
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  // сохраняем фильм в избранное
  const handleSaveMovies = (data) => {
    return api
      .saveMovies(data)
      .then((newMovies) => {
        setSavedMovies([newMovies, ...savedMovies]);
        return newMovies;
      })
      .catch((err) => err);
  };

  // Удаляем из избранного
  const handleDeleteMovies = (id) => {
    return api
      .deleteFromSaveMovies(id)
      .then((res) => {
        const newListSavedMovies = savedMovies.filter(
          (movies) => !(id === movies.id || id === movies._id)
        );
        setSavedMovies(newListSavedMovies);
        return newListSavedMovies;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //  ============ Функции авторизации/актуализации данных пользователя  ============

  const tokenCheck = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    }
    authentication
      .tokenCheck()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
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
        handleLogin(email, password)
          .then(() => {
            setLoggedIn(true);
            navigate("/movies", { replace: true });
          })
          .catch((err) => {
            console.log(err);
            setTimeout(() => {
              navigate("/signin", { replace: true });
            }, 300);
          });
      })
      .catch((err) => {
        return err;
      });
  };

  const handleLogin = (userEmail, userPassword) => {
    return authentication
      .signIn(userEmail, userPassword)
      .then((res) => {
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        return err;
      });
  };

  const handleLogOut = () => {
    return authentication
      .signOut()
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          localStorage.clear();
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 300);
        } else {
          console.log(`Не успешная попытка выйти... Попробуйте, чуть позже.`);
        }
      })
      .catch((err) => {
        console.log(`Произошла ${err}: ${err.massage}`);
      });
  };

  function handleUpdateUser(data) {
    // setIsLoadingForm(true);
    return api
      .sendUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        // setIsLoadingForm(false);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    tokenCheck();
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getMovies()])
        .then(([userData, movies]) => {
          setCurrentUser(userData);
          setSavedMovies(movies);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

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
                  <Movies
                    savedMovies={savedMovies}
                    handleCards={handleCards}
                    handleDeleteMovies={handleDeleteMovies}
                    handleSaveMovies={handleSaveMovies}
                  />
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
                  <SavedMovies
                    savedMovies={savedMovies}
                    handleDeleteMovies={handleDeleteMovies}
                  />
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
                  <Profile
                    handleLogOut={handleLogOut}
                    handleUpdateUser={handleUpdateUser}
                  />
                </>
              }
            ></ProtectedRoute>
          }
        />
        <Route element={<Anonymous loggedIn={loggedIn} />}>
          <Route
            path="/signin"
            element={<Login logo={mainLogo} handleLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={
              <Register
                logo={mainLogo}
                handleRegister={handleRegister}
                handleLogin={handleLogin}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
