import React from 'react';
import SavedNewsCard from '../SavedNewsCard/SavedNewsCard';

function SavedNews() {
  return (
    <>
      <div className="saved-news__text-block">
        <h4 className="saved-news__subtitle">Сохранённые статьи</h4>
        <div><h2 className="saved-news__title">Грета, у вас 4</h2>
          <h2 className="saved-news__title">сохранённые статьи</h2>
          </div>
        <div className="saved-news__keywords-line">
          <p className="saved-news__keywords">
            По ключевым словам:&nbsp;
      </p>
          <p className="saved-news__keywords saved-news__keywords_bold">
            Природа, погода&nbsp;
      </p>
          <p className="saved-news__keywords">и&nbsp;</p>
          <p className="saved-news__keywords saved-news__keywords_bold">
            2-м другим
      </p>
        </div>
      </div>
      <div className="saved-news">
        <div className="saved-news__cards">
          <SavedNewsCard />
          <SavedNewsCard />
          <SavedNewsCard />
          <SavedNewsCard />
        </div>
        <div className="saved-news__button-more-container">
          <button className="saved-news__button-more">Показать ещё</button>
        </div>
      </div>
    </>
  );
}

export default SavedNews;
