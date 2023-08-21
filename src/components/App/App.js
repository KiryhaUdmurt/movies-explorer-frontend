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
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import Menu from "../Menu/Menu";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import * as auth from "../../utils/auth";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState(() => {
    const prevCards = JSON.parse(localStorage.getItem("foundMovies"));
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

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((cards) => {
        const ownFilms = cards
          .filter((item) => item.owner === currentUser._id)
          .reverse();
        setLikedCards(ownFilms);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser]);

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

  const isLikedCard = (card) => {
    return likedCards.some((item) => item.movieId === card.id);
  };

  const handleDeleteCard = (card) => {
    const cardToDelete = likedCards.find((item) => item.movieId === card.id);
    console.log(card);
    console.log(cardToDelete);
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

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        auth
          .getContent(token)
          .then((user) => {
            if (user) {
              setCurrentUser(user);
              setIsLoggedIn(true);
              // navigate("/movies", { replace: true });
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const registerUser = ({ email, password, name }) => {
    auth
      .register(email, password, name)
      .then((res) => {
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const authorizeUser = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = () => {
    window.localStorage.clear();
    localStorage.clear("token");
    setCards([]);
    setSearch("");
    setIsToggled("");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const initialElements = () => {
    if (screenElement.clientWidth >= 1280) {
      return 12;
    } else if (
      screenElement.clientWidth < 1280 &&
      screenElement.clientWidth >= 651
    ) {
      return 8;
    } else {
      return 5;
    }
  };
  const [elementNum, setElementNum] = useState(initialElements);

  const handleSearch = () => {
    setIsLoading(true);
    moviesApi
      .getAllCards()
      .then((movies) => {
        let langConcatArr = [];
        const filteredMovies = movies.filter((item) =>
          langConcatArr
            .concat(item.nameRU, item.nameEN)
            .toString()
            .toLowerCase()
            .includes(search)
        );
        const foundMovies = isToggled
          ? filteredMovies.filter((item) => item.duration <= 40)
          : filteredMovies;

        localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
        setCards(foundMovies);
      })
      .catch((err) => {
        console.log(err);
        setMovieError(true);
      })
      .finally(() => {
        setIsLoading(false);
        setElementNum(initialElements);
      });
  };

  const filteredMovies = isToggled
    ? cards.filter((item) => item.duration <= 40)
    : cards;

  const handleSearchSavedCards = () => {
    let savedCardsArr = [];
    setLikedCards(
      likedCards.filter((card) =>
        savedCardsArr
          .concat(card.nameRU, card.nameEN)
          .toString()
          .toLowerCase()
          .includes(savedMoviesSearch)
      )
    );
  };
  const filteredSavedFilms = isToggledSavedCards
    ? likedCards.filter((card) => card.duration <= 40)
    : likedCards;

  // let savedCardsArr = [];
  // const filteredSavedFilms = likedCards.filter(
  //   (card) =>
  //     (isToggledSavedCards ? card.duration <= 40 : true) &&
  //     savedCardsArr
  //       .concat(card.nameRU, card.nameEN)
  //       .toString()
  //       .toLowerCase()
  //       .includes(savedMoviesSearch)
  // );


  const loadMore = () => {
    if (screenElement.clientWidth >= 1280) {
      setElementNum(elementNum + 3);
    } else if (
      screenElement.clientWidth < 1280 &&
      screenElement.clientWidth >= 651
    ) {
      setElementNum(elementNum + 2);
    } else {
      setElementNum(elementNum + 2);
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
                cards={filteredMovies.slice(0, elementNum)}
                search={search}
                setSearch={setSearch}
                moviesError={movieError}
                isLoading={isLoading}
                loadMore={loadMore}
                elementNum={elementNum}
                isToggled={isToggled}
                setIsToggled={setIsToggled}
                handleSearch={handleSearch}
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
                likedCards={filteredSavedFilms}
                setLikedCards={setLikedCards}
                handleDeleteCard={handleDeleteCard}
                handleSearchSavedCards={handleSearchSavedCards}
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
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login authorizeUser={authorizeUser} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/signup"
            element={
              <Register registerUser={registerUser} isLoggedIn={isLoggedIn} />
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
