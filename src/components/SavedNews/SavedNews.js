import React from 'react';
import PropTypes from 'prop-types';
import SavedNewsCard from '../SavedNewsCard/SavedNewsCard';

function SavedNews(props) {
  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  // функция возвращает полный список ключевых слов с дубликатами
  function getKeyWords() {
    const keyWordsArray = props.savedCards.map((item) => capitalize(item.keyword));
    return keyWordsArray;
  }
  const keywords = getKeyWords();

  // функция возвращает список ключевых слов без дублей и в порядке убывания по критерию частотности
  function getMostFrequentKeywords(arr) {
    const counted = arr.reduce((acc, word) => {
      if (acc[word]) {
        acc[word] += 1;
      } else {
        acc[word] = 1;
      }
      return acc;
    }, {});
    const array = Object.keys(counted).map((word) => [word, counted[word]]);
    const arraySorted = array.sort((a, b) => b[1] - a[1]);
    const string = arraySorted.join(',');
    const newArray = string.split(',');
    const filteredArray = newArray.filter((el, index) => !(index % 2));
    return filteredArray;
  }

  // функция возвращает либо 2 самых частотных ключевых слова, либо их полный перечень (if words<=3)
  function filterFrequentKeywords(arr) {
    const wordsArray = getMostFrequentKeywords(arr);
    if (wordsArray.length <= 3) {
      return wordsArray.join(', ');
    } return wordsArray.slice(0, 2).map((i) => i).join(', ');
  }

  const frequentKeywords = getMostFrequentKeywords(keywords);
  const keywordsFilterd = filterFrequentKeywords(frequentKeywords);

  // функция возвращает количество прочих ключевых слов, помимо 2х самых частотных
  function showNumberOfRestKeywords(arr) {
    if (arr.length > 3) {
      return `${arr.length - 2} другим`;
    } return '';
  }

  function toggleShownState() {
    const numberOfRestKeywords = showNumberOfRestKeywords(frequentKeywords);
    if (numberOfRestKeywords <= 3) {
      return 'saved-news__keywords saved-news__keywords_hidden';
    } return 'saved-news__keywords';
  }

  const iShownClass = toggleShownState();

  const numberOfRestKeywords = showNumberOfRestKeywords(frequentKeywords);

  const wordCaseForm = props.wordForm();
  return (
    <>
      <div className="saved-news__text-block">
        <h4 className="saved-news__subtitle">Сохранённые статьи</h4>
        <div><h2 className="saved-news__title">{`${props.userName}`}, у вас {`${props.savedCards.length}`}</h2>
          <h2 className="saved-news__title">{wordCaseForm}</h2>
        </div>
        <div className="saved-news__keywords-line">
          <p className="saved-news__keywords">
            По ключевым словам:&nbsp;
      </p>
          <p className="saved-news__keywords saved-news__keywords_bold">
            {`${keywordsFilterd}`}
          </p>
          <p className={iShownClass}>&nbsp;и&nbsp;</p>
          <p className="saved-news__keywords saved-news__keywords_bold">
            {`${numberOfRestKeywords}`}
          </p>
        </div>
      </div>
      <div className="saved-news">
        <div className="saved-news__cards">
          {props.savedCards.slice(0, props.visibleCards).map((card, i) => <SavedNewsCard key={i}
            savedCard={card} showMoreCards={props.showMoreCards} visibleCards={props.visibleCards}
            onCardDelete={props.onCardDelete} dateFormat={props.dateFormat} />)}
        </div>
        {props.visibleCards < props.savedCards.length && <div className={'saved-news__button-more-container saved-news__button-more-container_visible'}>
          <button className="saved-news__button-more" onClick={props.showMoreCards}>
            Показать ещё</button>
        </div>}
      </div>
    </>
  );
}

export default SavedNews;

SavedNews.propTypes = {
  savedCards: PropTypes.array,
  showMoreCards: PropTypes.func,
  visibleCards: PropTypes.number,
  onCardDelete: PropTypes.func,
  userName: PropTypes.string,
  wordForm: PropTypes.func,
  dateFormat: PropTypes.func,
};
