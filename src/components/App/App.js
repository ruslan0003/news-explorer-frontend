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
import { getToken, removeToken, setToken } from '../../utils/token';
// import initialCards from '../../utils/initialArticles2';
// import Preloader from '../Preloader/Preloader';
import UserContext from '../../contexts/UserContext';
import { getContent, getSavedNews, saveCard } from '../../utils/MainApi';

function App() {
  const history = useHistory();

  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = React.useState(false);
  const [isRegistrationValid, setRegistrationStatus] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);
  const [isFound, setFound] = React.useState(false);
  const [isSearchClicked, setSearchClicked] = React.useState(false);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  /* function changeDataFormat(arr) {
    let data = arr.articles.publishedAts.split('');
    arr.sort(function (a, b) {
        return a > b; // тут любой ваш алгоритм сортировки
    });
    return arr.join('');
} */

  function setSearchFound() {
    setFound(true);
  }

  function setSearchNotFound() {
    setFound(false);
  }

  function renderSearchResults(apiCards, keyword) {
    const newsCards = apiCards.map((item) => ({
      image: item.urlToImage,
      url: item.url,
      date: item.publishedAt,
      title: item.title,
      intro: item.description,
      source: item.source.name,
      keyword,
    }));
    setCards(newsCards);
    if (newsCards.length === 0) {
      setSearchNotFound();
      console.log('Ничего не найдено');
      console.log(isFound);
      console.log(isSearchClicked);
    } else {
      setSearchFound();
      console.log('Что-то найдено');
    }
  }

  function renderSavedCards(jwt) {
    Promise.all([
      getSavedNews(jwt),
    ]).then(([cardsApi]) => {
      // console.log(cardsApi);
      const savedArticles = cardsApi.data.map((item) => ({
        title: item.title,
        keyword: item.keyword,
        text: item.text,
        source: item.source,
        date: item.date,
        link: item.link,
        image: item.image,
        _id: item._id,
        owner: item.owner,
      }));
      setSavedCards(savedArticles);
    }).catch((err) => {
      console.log(err);
    });
  }

  function tokenCheck() {
    const jwt = getToken();
    if (jwt) {
      getContent(jwt).then((res) => {
        if (res) {
          const currentUserData = {
            email: res.email,
            name: res.name,
            _id: res._id,
          };
          setUserData(currentUserData);
          console.log(userData.name);
          setLoggedIn(true);
          history.push('/');
        }
      }).catch((err) => {
        console.log(err);
      });
      return true;
    } return false;
  }

  React.useEffect(() => {
    const tokenStatus = tokenCheck();
    if (tokenStatus) {
      const jwt = getToken();
      renderSavedCards(jwt);
    } tokenCheck();
  }, []);

  function handleSearchClick(apiCards, keyword) {
    setSearchClicked(true);
    const apiArticles = apiCards.articles;
    renderSearchResults(apiArticles, keyword);
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

  function handleRegistrationStatus(status) {
    setRegistrationStatus(status);
  }

  function handleRegister(boolean) {
    handleInfoPopupOpen();
    handleRegistrationStatus(boolean);
  }

  function handleLogin(currentUserData, userToken) {
    setLoggedIn(true);
    closeAllPopups();
    setUserData(currentUserData);
    setToken(userToken);
    tokenCheck();
    renderSavedCards(userToken);
    console.log(currentUserData);
  }

  function handleLogout() {
    setLoggedIn(false);
    history.push('/');
    removeToken();
  }

  function toggleMenuState() {
    setMenuOpen(!isMenuOpen);
  }

  function handleSaveCard(title, url, date, intro, image, source, keywords) {
    saveCard(title, url, date, intro, image, source, keywords).then(
      (newCard) => {
        setCards([...cards, newCard.card]);
        closeAllPopups();
      },
    ).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="app">
      <div className={isMenuOpen ? 'app__dark-overlay' : 'app__dark-overlay app__dark-overlay_hidden'}></div>
      <UserContext.Provider value={userData}>
        <Switch>
          <Route path="/" exact>
            <Header onLoginClick={handleLoginPopupOpen} isLoggedIn={loggedIn}
              onLogoutClick={handleLogout} onMenuOpenClick={toggleMenuState}
              isMenuOpen={isMenuOpen} userName={userData.name} />
            <SearchForm onSearchClick={handleSearchClick} emptyRequest={setSearchNotFound} />
            <Main isLoggedIn={loggedIn} cards={cards} isFound={isFound}
              isSearchClicked={isSearchClicked} saveCard={handleSaveCard} />
          </Route>
          <Route path="/saved-news" exact>
            <SavedNewsHeader onLogoutClick={handleLogout} onMenuOpenClick={toggleMenuState}
              isMenuOpen={isMenuOpen} userName={userData.name} />
            <SavedNews savedCards={savedCards} />
          </Route>
        </Switch>
        {/* <Preloader /> */}
        <Footer />
        <LoginPopup isOpen={isLoginPopupOpen} onClose={closeAllPopups}
          onRegisterClick={handleRegisterPopupOpen} onSubmit={handleLogin} />
        <RegisterPopup isOpen={isRegisterPopupOpen} onClose={closeAllPopups}
          onLoginClick={handleLoginPopupOpen} onSubmit={handleRegister} />
        <InfoPopup isOpen={isInfoPopupOpen} onClose={closeAllPopups}
          onLoginClick={handleLoginPopupOpen} isRegistrationValid={isRegistrationValid} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
