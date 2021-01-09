import React from 'react';
import { Route, Switch } from 'react-router';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import SavedNews from '../SavedNews/SavedNews';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function App() {
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);

  function closeAllPopups() {
    setLoginPopupOpen(false);
    setRegisterPopupOpen(false);
  }

  function handleLoginPopupOpen() {
    setLoginPopupOpen(true);
    setRegisterPopupOpen(false);
  }

  function handleRegisterPopupOpen() {
    setRegisterPopupOpen(true);
    setLoginPopupOpen(false);
  }

  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Header onLoginClick={handleLoginPopupOpen} />
          <SearchForm />
          <Main />
        </Route>
        <Route path="/saved-news" exact>
          <SavedNewsHeader />
          <SavedNews />
        </Route>
      </Switch>
      <Footer />
      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeAllPopups}
        onRegisterClick={handleRegisterPopupOpen} />
      <RegisterPopup isOpen={isRegisterPopupOpen} onClose={closeAllPopups}
        onLoginClick={handleLoginPopupOpen} />
    </div>
  );
}

export default App;
