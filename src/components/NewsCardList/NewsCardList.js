import React from 'react';
import PropTypes from 'prop-types';
import NewsCard from '../NewsCard/NewsCard';
import notFound from '../../images/not-found.svg';

function NewsCardList(props) {
  return (
    props.isFound ? <div className={props.isFound ? 'results results_visible' : 'results'} >
      <h2 className="results__title">Результаты поиска</h2>
      <div className="results__cards">
        {props.cards.map((card, i) => <NewsCard key={i} isLoggedIn={props.isLoggedIn}
          card={card} />)}
      </div>
      <div className="results__button-more-container">
        <button className="results__button-more">Показать ещё</button>
      </div>
    </div>
      : <div className={props.isSearchClicked ? 'not-found not-found_visible' : 'not-found'}>
        <img className="not-found__image" src={notFound} alt="Ничего не найдено"></img>
        <h4 className="not-found__title">Ничего не найдено</h4>
        <p className="not-found__text">К сожалению, по вашему запросу ничего не найдено.</p>
      </div>
  );
}

NewsCardList.propTypes = {
  isLoggedIn: PropTypes.bool,
  isFound: PropTypes.bool,
  isSearchClicked: PropTypes.bool,
  cards: PropTypes.array,
};

export default NewsCardList;
