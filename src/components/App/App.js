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
  const [token, setToken] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState(() => {
    const prevCards = JSON.parse(localStorage.getItem("allCards"));
    return prevCards || [];
  });
  // const [isLiked, setIsLiked] = useState(false);
  const [likedCards, setLikedCards] = useState([]);
  const [menuActive, setMenuActive] = useState(false);
  const [search, setSearch] = useState(() => {
    const searchTxt = localStorage.getItem("searchTxt");
    return searchTxt || "";
  });
  const [movieError, setMovieError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isToggled, setIsToggled] = useState(() => {
    const savedToggle = JSON.parse(localStorage.getItem("toggle"));
    return savedToggle || false;
  });
  const screenElement = document.getElementById("root");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     const token = localStorage.getItem("token");
  //     setToken(token);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   }

  //   auth
  //     .getContent(token)
  //     .then((user) => {
  //       if (user) {
  //         console.log(user);
  //         setCurrentUser(user);
  //         setIsLoggedIn(true);
  // navigate("/movies", { replace: true });
  //   }
  // })
  // .catch((err) => console.log(err));

  // mainApi
  //   .getUser()
  //   .then((user) => {
  //     console.log(user)
  //     setCurrentUser(user);
  //   })
  //   .catch((err) => console.log(err));
  // }, [token, navigate]);

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
              console.log(user);
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
        setIsRegistered(true);
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        setIsRegistered(false);
        console.log(err);
      });
  };

  const authorizeUser = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("allCards");
    localStorage.removeItem("searchTxt");
    localStorage.removeItem("toggle");
    localStorage.removeItem("sortedCards");
    setIsLoggedIn(false);
    setToken("");
    setCurrentUser({});
  };

  const initialElements = () => {
    if (screenElement.clientWidth >= 1300) {
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
      .then((cards) => {
        setCards(cards);
        localStorage.setItem("allCards", JSON.stringify(cards));
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

  let cardsArr = [];
  const sortedCards =
    search === ""
      ? []
      : cards
          .filter(
            (card) =>
              (isToggled ? card.duration < 40 : true) &&
              cardsArr
                .concat(card.nameRU, card.nameEN)
                .toString()
                .toLowerCase()
                .includes(search)
          )
          .slice(0, elementNum);

  localStorage.setItem("sortedCards", JSON.stringify(sortedCards));
  const savedCards = JSON.parse(localStorage.getItem("sortedCards"));

  const loadMore = () => {
    if (screenElement.clientWidth >= 1300) {
      setElementNum(elementNum + 3);
    } else if (
      screenElement.clientWidth < 1280 &&
      screenElement.clientWidth >= 651
    ) {
      setElementNum(elementNum + 2);
    } else {
      setElementNum(elementNum + 1);
    }
  };

  const getSavedCards = () => {
    mainApi
      .getSavedMovies()
      .then((cards) => {
        setLikedCards(cards)

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSavedCards();
  }, [])

  const handleCardLike = (card) => {
    const isLiked = card.owner === currentUser._id;

    isLiked
      ? mainApi
          .deleteMovie(card.id)
          .then(() => {
            setLikedCards((state) => {
              state.filter((c) => {
                return c.id !== card.id;
              })
            })
          })
          .catch((err) => {
            console.log(err);
          })
      : mainApi
          .addMovie(card)
          .then((card) => {
            console.log(card);
            setLikedCards([...likedCards, card]);
          })
          .catch((err) => {
            console.log(card);
            console.log(err);
          });
  };

  const handleDeleteCard = (card) => {
    mainApi.deleteMovie(card.id)
    .then(() => {
      setLikedCards((state) => {
        state.filter((c) => {
          return c.id !== card.id;
        })
      })
    })
  }

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
                cards={savedCards}
                search={search}
                setSearch={setSearch}
                moviesError={movieError}
                isLoading={isLoading}
                loadMore={loadMore}
                elementNum={elementNum}
                isToggled={isToggled}
                setIsToggled={setIsToggled}
                handleSearch={handleSearch}
                handleCardLike={handleCardLike}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                handleCardLike={handleCardLike}
                likedCards={likedCards}
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
