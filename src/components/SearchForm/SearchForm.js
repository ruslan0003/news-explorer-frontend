import React from 'react';
import PropTypes from 'prop-types';
import { findArticles } from '../../utils/NewsApi';

function SearchForm(props) {
  const [request, setRequest] = React.useState('');

  function handleChangeRequest(evt) {
    setRequest(evt.target.value);
  }

  async function handleSearchClick(evt) {
    evt.preventDefault();
    if (request === '') {
      props.emptyRequest();
    } else {
      const foundArticles = await findArticles(request);
      props.onSearchClick(foundArticles, request);
    }
  }

  return (
    <div className="search">
      <div className="search__container">
        <h1 className="search__title">Что творится в мире?</h1>
        <h4 className="search__subtitle">
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
        </h4>
        <div className="search__form">
          <input className="search__field" type="search" placeholder="Введите тему новости" onChange={handleChangeRequest} required></input>
          <button className="search__button" onClick={handleSearchClick}>Искать</button></div>
      </div>

    </div>
  );
}

SearchForm.propTypes = {
  onSearchClick: PropTypes.func,
  setSearchClicked: PropTypes.func,
  emptyRequest: PropTypes.func,
};

export default SearchForm;
