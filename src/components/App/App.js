import React, { useEffect, useMemo, useState } from "react";
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
import { Route, Routes } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import Menu from "../Menu/Menu";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { moviesApi } from "../../utils/MoviesApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [menuActive, setMenuActive] = useState(false);
  const [search, setSearch] = useState("");
  const [movieError, setMovieError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const screenElement = document.getElementById("root");

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

  console.log(elementNum);

  useEffect(() => {
    setIsLoading(true);
    moviesApi
      .getAllCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
        setMovieError(true);
      })
      .finally(() => {
        setIsLoading(false);
        setElementNum(initialElements);
      });
  }, [search]);

  // const sortedCards = useMemo(() => {
  //   return cards.filter(card => card.nameRU.toLowerCase().includes(search))
  // }, [search])

  // const sortedCards = () => {
  //   return cards.filter(card => card.nameRU.toLowerCase().includes(search));
  // }

  // const sortedCards =
  //   search === ""
  //     ? ""
  //     : cards
  //         .filter((card) => card.nameRU.toLowerCase().includes(search))
  //         .slice(0, elementNum);

  let cardsArr = [];
  const sortedCards =
    search === ""
      ? ""
      : cards
          .filter((card) =>
            cardsArr
              .concat(card.nameRU, card.nameEN)
              .toString()
              .toLowerCase()
              .includes(search)
          )
          .slice(0, elementNum);

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

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header menuActive={menuActive} setActive={setMenuActive} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <Movies
                cards={sortedCards}
                search={search}
                setSearch={setSearch}
                moviesError={movieError}
                isLoading={isLoading}
                loadMore={loadMore}
                elementNum={elementNum}
              />
            }
          />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Menu active={menuActive} setActive={setMenuActive} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
