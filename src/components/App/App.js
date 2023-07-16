import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';
import '../../index.css'

function App() {
  return (
    <>
      <Header />
      <Main />
      <Movies />
      <SavedMovies />
      <Register />
      <Login />
      <Profile />
      <Footer />
    </>
  );
}

export default App;
