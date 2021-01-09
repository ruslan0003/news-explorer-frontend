import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList() {
  return (
    <div className="results">
      <h2 className="results__title">Результаты поиска</h2>
      <div className="results__cards">
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
      <div className="results__button-more-container">
        <button className="results__button-more">Показать ещё</button>
      </div>
    </div>
  );
}

export default NewsCardList;
