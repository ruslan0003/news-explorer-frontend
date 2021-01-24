import React from 'react';
import PropTypes from 'prop-types';
import findArticles from '../../utils/NewsApi';
import ERROR_MESSAGES from '../../utils/errorMessages';

function SearchForm(props) {
  const [request, setRequest] = React.useState('');
  const [isRequestEmpty, setRequestIsEmpty] = React.useState(false);

  function handleChangeRequest(evt) {
    setRequest(evt.target.value);
  }

  async function handleSearchClick(evt) {
    evt.preventDefault();
    try {
      props.setIsLoading(true);
      if (request === '') {
        setRequestIsEmpty(true);
        props.setIsLoading(false);
      } else {
        const foundArticles = await findArticles(request);
        if (foundArticles !== undefined) {
          props.setIsLoading(false);
          props.onSearchClick(foundArticles, request);
        }
      }
    } catch (err) {
      console.log(err);
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
          <input className="search__field" type="search" placeholder={isRequestEmpty ? `${ERROR_MESSAGES.EMPTY_REQUEST}` : 'Введите тему новости'} onChange={handleChangeRequest} required></input>
          <button className="search__button" onClick={handleSearchClick}>Искать</button></div>
      </div>
    </div>
  );
}

SearchForm.propTypes = {
  onSearchClick: PropTypes.func,
  setSearchClicked: PropTypes.func,
  setIsLoading: PropTypes.func,
};

export default SearchForm;
