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
import {
  getContent,
  getSavedNews,
  saveCard,
  deleteCard,
} from '../../utils/MainApi';

//  const isOwn = props.card.owner === currentUser._id;

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
  const [visibleCards, setVisibleCards] = React.useState(3);
  const [visibleSavedCards, setVisibleSavedCards] = React.useState(3);
  const [isShowMoreDisabled, setShowMoreDisabled] = React.useState(undefined);

  function showMoreCards() {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
  }

  function showMoreSavedCards() {
    setVisibleSavedCards((prevVisibleCards) => prevVisibleCards + 3);
  }

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
      link: item.url,
      date: item.publishedAt,
      title: item.title,
      text: item.description,
      source: item.source.name,
      keyword,
    }));
    setCards(newsCards);
    if (newsCards.length === 0) {
      setSearchNotFound();
    } else {
      setSearchFound();
    }
  }

  function renderSavedCards(jwt) {
    Promise.all([
      getSavedNews(jwt),
    ]).then(([cardsApi]) => {
      const savedArticles = cardsApi.data.map((item) => ({
        image: item.image,
        link: item.link,
        date: item.date,
        title: item.title,
        text: item.text,
        source: item.source,
        keyword: item.keyword,
        _id: item._id,
      }));
      setSavedCards(savedArticles);
    })
      .catch((err) => {
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
    setVisibleCards(3);
    setShowMoreDisabled(false);
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

  function handleSaveCard(card) {
    saveCard(
      card.image,
      card.link,
      card.date,
      card.title,
      card.text,
      card.source,
      card.keyword,
      card._id,
    ).then((newCard) => {
      setSavedCards((savedCardsArray) => [...savedCardsArray, newCard.restArticle]);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    deleteCard(card._id).then(() => {
      const cardsWithoutDeleted = savedCards.filter((c) => c._id !== card._id);
      setSavedCards(cardsWithoutDeleted);
    }).catch((err) => {
      console.log(err);
    });
  }

  function declenseByCases() {
    const n = savedCards.length;
    let word;
    if ((n === 1) || (n > 20 && n % 10 === 1)) {
      word = 'сохранённая статья';
    } else if ((n >= 2 && n <= 4) || (n > 20 && n % 10 >= 2 && n % 10 <= 4)) {
      word = 'сохранённых статьи';
    } else word = 'сохранённых статей';
    return word;
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
              isSearchClicked={isSearchClicked} saveCard={handleSaveCard}
              showMoreCards={showMoreCards} savedCards={savedCards}
              isShowMoreDisabled={isShowMoreDisabled} visibleCards={visibleCards}
              onCardDelete={handleCardDelete} />
          </Route>
          <Route path="/saved-news" exact>
            <SavedNewsHeader onLogoutClick={handleLogout} onMenuOpenClick={toggleMenuState}
              isMenuOpen={isMenuOpen} userName={userData.name} />
            <SavedNews savedCards={savedCards} showMoreCards={showMoreSavedCards}
              visibleCards={visibleSavedCards} userName={userData.name}
              onCardDelete={handleCardDelete} wordForm={declenseByCases} />
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
