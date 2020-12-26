import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function App() {
  return (
    <div className="app">
      <Header />
      <SearchForm />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
