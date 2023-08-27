import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import "./App.css";
import "../../index.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import Menu from "../Menu/Menu";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import * as auth from "../../utils/auth";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import {
  LOAD_12,
  LOAD_2_MORE,
  LOAD_3_MORE,
  LOAD_5,
  LOAD_8,
  REQ_ERRORS_TXT,
  SCREEN_SIZE_L,
  SCREEN_SIZE_S,
} from "../../utils/constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState(() => {
    const prevCards = JSON.parse(localStorage.getItem("allCards"));
    return prevCards || [];
  });
  const [likedCards, setLikedCards] = useState([]);
  const [menuActive, setMenuActive] = useState(false);
  const [search, setSearch] = useState(() => {
    const searchTxt = localStorage.getItem("searchTxt");
    return searchTxt || "";
  });
  const [savedMoviesSearch, setSavedMoviesSearch] = useState("");
  const [movieError, setMovieError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isToggled, setIsToggled] = useState(() => {
    const savedToggle = JSON.parse(localStorage.getItem("toggle"));
    return savedToggle || false;
  });
  const [isToggledSavedCards, setIsToggledSavedCards] = useState(false);
  const screenElement = document.getElementById("root");
  const navigate = useNavigate();
  const location = useLocation();
  const pageToGo = location.pathname;
  const isOnSavedMoviesPage = location.pathname === "/saved-movies";
  const [reqError, setReqError] = useState("");

  // ПОЛУЧЕНИЕ СОХРАНЕННЫХ ФИЛЬМОВ
  const getSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then((movies) => setLikedCards(movies))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setSavedMoviesSearch("");
    setIsToggledSavedCards(false);
  }, [isOnSavedMoviesPage]);

  // ПРОСТАВЛЕНИЕ ЛАЙКА
  const handleLikeCard = (card) => {
    mainApi
      .addMovie(card)
      .then((card) => {
        setLikedCards([...likedCards, card]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //  СНЯТИЕ ЛАЙКА
  const handleDeleteCard = (card) => {
    const cardToDelete = likedCards.find(
      (item) => item.movieId === card.id && item.owner === currentUser._id
    );
    mainApi
      .deleteMovie(cardToDelete ? cardToDelete._id : card._id)
      .then(() => {
        setLikedCards(
          likedCards.filter((item) => {
            return cardToDelete
              ? item._id !== cardToDelete._id
              : item._id !== card._id;
          })
        );
      })
      .catch((err) => console.log(err));
  };
  // ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ
  const getUser = () => {
    mainApi
      .getUser()
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err));
  };

  // ПРОВЕРКА ТОКЕНВ
  const checkToken = () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        auth
          .getContent(token)
          .then((user) => {
            if (user) {
              setIsLoggedIn(true);
              getUser();
              setReqError("");
              getSavedMovies();
              navigate(pageToGo);
            }
          })
          .catch((err) => console.log(err));
        setReqError(REQ_ERRORS_TXT.authErr);
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  // ЛОГИН
  const authorizeUser = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setIsLoggedIn(true);
        getUser();
        navigate("/movies", { replace: true });
        getSavedMovies();
        setReqError("");
      })
      .catch((err) => {
        console.log(err);
        setReqError(REQ_ERRORS_TXT.loginErr);
      });
  };

  // РЕГИСТРАЦИЯ
  const registerUser = ({ email, password, name }) => {
    auth
      .register(email, password, name)
      .then((res) => {
        authorizeUser({ email, password });
      })
      .catch((err) => {
        console.log(err);
        if (err.includes("409")) {
          setReqError(REQ_ERRORS_TXT.emailErr);
        } else {
          setReqError(REQ_ERRORS_TXT.registerErr);
        }
      });
  };

  // ВЫХОД ИЗ АККАУНТА
  const logOut = () => {
    window.localStorage.clear();
    localStorage.clear("token");
    setCards([]);
    setSearch("");
    setIsToggled("");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  // ОТОБРАЖЕНИЕ КОЛ-ВА КАРТОЧЕК В ЗАВИСИМОСТИ ОТ РАЗРЕШЕНИЯ ЭКРАНА
  const initialElements = () => {
    if (screenElement.clientWidth >= SCREEN_SIZE_L) {
      return LOAD_12;
    } else if (
      screenElement.clientWidth < SCREEN_SIZE_L &&
      screenElement.clientWidth >= SCREEN_SIZE_S
    ) {
      return LOAD_8;
    } else {
      return LOAD_5;
    }
  };

  const [elementNum, setElementNum] = useState(initialElements);

  useEffect(() => {
    setElementNum(initialElements);
  }, [search]);

  // ПОЛУЧЕНИЕ ВСЕХ КАРТОЧЕК И ФИЛЬТРАЦИЯ
  const handleFirstSearch = () => {
    if (!localStorage.getItem("allCards")) {
      setIsLoading(true);
      moviesApi
        .getAllCards()
        .then((movies) => {
          setCards(movies);
          localStorage.setItem("allCards", JSON.stringify(movies));
        })
        .catch((err) => {
          console.log(err);
          setMovieError(true);
        })
        .finally(() => {
          setIsLoading(false);
          setElementNum(initialElements);
        });
    }
  };

  const filterMain = (cards) => {
    let langConcatArr = [];
    return cards.filter((item) =>
      isToggled
        ? langConcatArr
            .concat(item.nameRU, item.nameEN)
            .toString()
            .toLowerCase()
            .includes(search.toLocaleLowerCase()) && item.duration <= 40
        : langConcatArr
            .concat(item.nameRU, item.nameEN)
            .toString()
            .toLowerCase()
            .includes(search.toLocaleLowerCase())
    );
  };

  // ФИЛЬТРАЦИЯ ПО СОХРАНЕННЫМ КАРТОЧКАМ
  const handleSearchSaved = (likedCards) => {
    let savedCardsArr = [];
    return likedCards.filter((item) =>
      isToggledSavedCards
        ? savedCardsArr
            .concat(item.nameRU, item.nameEN)
            .toString()
            .toLowerCase()
            .includes(savedMoviesSearch.toLowerCase()) &&
          item.duration <= 40 &&
          item.owner === currentUser._id
        : savedCardsArr
            .concat(item.nameRU, item.nameEN)
            .toString()
            .toLowerCase()
            .includes(savedMoviesSearch.toLowerCase()) &&
          item.owner === currentUser._id
    );
  };

  // СТАТУС ФИЛЬМА
  const isLikedCard = (card) => {
    return handleSearchSaved(likedCards).some(
      (item) => item.movieId === card.id
    );
  };

  // ОТОБРАЗИТЬ БОЛЬШЕ ФИЛЬМОВ
  const loadMore = () => {
    if (screenElement.clientWidth >= SCREEN_SIZE_L) {
      setElementNum(elementNum + LOAD_3_MORE);
    } else if (
      screenElement.clientWidth < SCREEN_SIZE_L &&
      screenElement.clientWidth >= SCREEN_SIZE_S
    ) {
      setElementNum(elementNum + LOAD_2_MORE);
    } else {
      setElementNum(elementNum + LOAD_2_MORE);
    }
  };

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          menuActive={menuActive}
          setActive={setMenuActive}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                element={Movies}
                cards={filterMain(cards).slice(0, elementNum)}
                search={search}
                setSearch={setSearch}
                moviesError={movieError}
                isLoading={isLoading}
                loadMore={loadMore}
                elementNum={elementNum}
                isToggled={isToggled}
                setIsToggled={setIsToggled}
                handleSearch={handleFirstSearch}
                handleLikeCard={handleLikeCard}
                isLikedCard={isLikedCard}
                handleDeleteCard={handleDeleteCard}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                handleLikeCard={handleLikeCard}
                isLikedCard={isLikedCard}
                likedCards={handleSearchSaved(likedCards)}
                setLikedCards={setLikedCards}
                handleDeleteCard={handleDeleteCard}
                handleSearchSavedCards={handleSearchSaved}
                isToggledSavedCards={isToggledSavedCards}
                setIsToggledSavedCards={setIsToggledSavedCards}
                savedMoviesSearch={savedMoviesSearch}
                setSavedMoviesSearch={setSavedMoviesSearch}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                isLoggedIn={isLoggedIn}
                logOut={logOut}
                setCurrentUser={setCurrentUser}
                reqError={reqError}
                setReqError={setReqError}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                authorizeUser={authorizeUser}
                isLoggedIn={isLoggedIn}
                reqError={reqError}
                setReqError={setReqError}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                registerUser={registerUser}
                isLoggedIn={isLoggedIn}
                reqError={reqError}
                setReqError={setReqError}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Menu active={menuActive} setActive={setMenuActive} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
