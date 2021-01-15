import React from 'react';
import { Route, Switch } from 'react-router';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import SavedNews from '../SavedNews/SavedNews';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import InfoPopup from '../PopupWithText/PopupWithText';
import initialCards from '../../utils/initialArticles';
// import Preloader from '../Preloader/Preloader';
// import UserContext from '../../contexts/UserContext';

function App() {
  const history = useHistory();

  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = React.useState(false);
  // const [userData, setUserData] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isFound, setFound] = React.useState(false);
  const [isSearchClicked, setSearchClicked] = React.useState(false);
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  function renderSearchResults() {
    const newsCards = initialCards.map((item) => ({
      image: item.image,
      date: item.date,
      title: item.title,
      intro: item.intro,
      source: item.source,
      keywords: item.keywords,
    }));
    setCards(newsCards);
  }

  function handleSearchClick() {
    setSearchClicked(true);
    renderSearchResults();
  }

  function closeAllPopups() {
    setLoginPopupOpen(false);
    setRegisterPopupOpen(false);
    setInfoPopupOpen(false);
  }

  function handleLoginPopupOpen() {
    setLoginPopupOpen(true);
    setRegisterPopupOpen(false);
    setInfoPopupOpen(false);
  }

  function handleRegisterPopupOpen() {
    setRegisterPopupOpen(true);
    setLoginPopupOpen(false);
    setInfoPopupOpen(false);
  }

  function handleInfoPopupOpen() {
    setLoginPopupOpen(false);
    setRegisterPopupOpen(false);
    setInfoPopupOpen(true);
  }

  function handleRegister() {
    handleInfoPopupOpen();
  }

  function handleLogin() {
    setLoggedIn(true);
    closeAllPopups();
  }

  function handleLogout() {
    setLoggedIn(false);
    history.push('/');
  }

  function setSearchFound() {
    setFound(true);
  }

  function setSearchNotFound() {
    setFound(false);
  }

  function toggleMenuState() {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <div className="app">
      <div className={isMenuOpen ? 'app__dark-overlay' : 'app__dark-overlay app__dark-overlay_hidden'}></div>
        {/* <UserContext.Provider value={userData}> */}
        <Switch>
          <Route path="/" exact>
            <Header onLoginClick={handleLoginPopupOpen} isLoggedIn={loggedIn}
              onLogoutClick={handleLogout} onMenuOpenClick={toggleMenuState}
              isMenuOpen={isMenuOpen} />
            <SearchForm onSearchClick={handleSearchClick} setSearchFound={setSearchFound}
              setSearchNotFound={setSearchNotFound} />
            <Main isLoggedIn={loggedIn} cards={cards} isFound={isFound}
              isSearchClicked={isSearchClicked} />
          </Route>
          <Route path="/saved-news" exact>
            <SavedNewsHeader onLogoutClick={handleLogout} onMenuOpenClick={toggleMenuState}
              isMenuOpen={isMenuOpen} />
            <SavedNews />
          </Route>
        </Switch>
        {/* <Preloader /> */}
        <Footer />
        <LoginPopup isOpen={isLoginPopupOpen} onClose={closeAllPopups}
          onRegisterClick={handleRegisterPopupOpen} onSubmit={handleLogin} />
        <RegisterPopup isOpen={isRegisterPopupOpen} onClose={closeAllPopups}
          onLoginClick={handleLoginPopupOpen} onSubmit={handleRegister} />
        <InfoPopup isOpen={isInfoPopupOpen} onClose={closeAllPopups}
          onLoginClick={handleLoginPopupOpen} />
        {/* </UserContext.Provider> */}
    </div>
  );
}

export default App;
