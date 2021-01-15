import React from 'react';
import PropTypes from 'prop-types';

function SearchForm(props) {
  const [request, setRequest] = React.useState('');

  function handleSearchClick() {
    if (request === 'природа') {
      props.onSearchClick();
      props.setSearchFound();
    } else {
      props.onSearchClick();
      props.setSearchNotFound();
    }
  }

  function handleChangeRequest(evt) {
    setRequest(evt.target.value);
  }

  return (
    <div className="search">
      <div className="search__container">
        <h1 className="search__title">Что творится в мире?</h1>
        <h4 className="search__subtitle">
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
        </h4>
        <div className="search__form">
          <input className="search__field" type="search" placeholder="Введите тему новости" onChange={handleChangeRequest}></input>
          <button className="search__button" onClick={handleSearchClick}>Искать</button></div>
      </div>

    </div>
  );
}

SearchForm.propTypes = {
  onSearchClick: PropTypes.func,
  setSearchFound: PropTypes.func,
  setSearchNotFound: PropTypes.func,
  setSearchClicked: PropTypes.func,
};

export default SearchForm;
