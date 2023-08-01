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
  const searchResult = true;
  const [search, setSearch] = useState("");
  const [movieError, setMovieError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    moviesApi
    .getAllCards()
    .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err)
        setMovieError(true)
      }).finally(() => {
        setIsLoading(false);
      });
  }, [search]);

  const sortedCards = useMemo(() => {
    return cards.filter(card => card.nameRU.toLowerCase().includes(search))
  }, [search]) 

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
                searchResult={searchResult}
                cards={sortedCards}
                search={search}
                setSearch={setSearch}
                moviesError={movieError}
                isLoading={isLoading}
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
