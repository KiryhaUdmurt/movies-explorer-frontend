import React, { useState } from "react";
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

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const searchResult = true;

  return (
    <div className="app">
      <Header menuActive={menuActive} setActive={setMenuActive} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies searchResult={searchResult} />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Menu active={menuActive} setActive={setMenuActive} />
    </div>
  );
}

export default App;
