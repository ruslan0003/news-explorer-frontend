import React from 'react';

function SearchForm() {
  return (
    <div className="search">
      <div className="search__container">
        <h1 className="search__title">Что творится в мире?</h1>
        <h4 className="search__subtitle">
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
        </h4>
        <div className="search__form">
          <input className="search__field" type="search" placeholder="Введите тему новости"></input>
          <button className="search__button">Искать</button></div>
      </div>

    </div>
  );
}

export default SearchForm;
