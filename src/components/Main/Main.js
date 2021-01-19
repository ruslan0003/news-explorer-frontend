import React from 'react';
import PropTypes from 'prop-types';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main(props) {
  return (
    <div className="main">
      <NewsCardList isLoggedIn={props.isLoggedIn} cards={props.cards} isFound={props.isFound}
      isSearchClicked={props.isSearchClicked} />
      <div className="author">
        <div className="author__photo"></div>
        <div className="author__about">
          <h2 className="author__title">Об авторе</h2>
          <p className="author__text">
            Предприниматель. Курирую свыше 100 творческих фестивалей-конкурсов в 25 городах России,
            стран СНГ, Европы и Азии для более чем 30 000 участников ежегодно.
            Член Ассоциации искусствоведов РФ, автор книги «Игра случая в истории искусства:
            генерируй то, генерируй это» (Алетейя, 2017). Участник всероссийских и международных
            научно-практических конференций, конгрессов, форумов.
            Приглашённый гость теле- и радиопередач. Владею английским и японским языками.
            Живу и работаю в Санкт-Петербурге.
        </p>
        </div>
      </div>
    </div>
  );
}

Main.propTypes = {
  isLoggedIn: PropTypes.bool,
  cards: PropTypes.array,
  isFound: PropTypes.bool,
  isSearchClicked: PropTypes.bool,
};

export default Main;
