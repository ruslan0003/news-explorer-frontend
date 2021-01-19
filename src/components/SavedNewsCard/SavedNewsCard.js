import React from 'react';
import deleteIcon from '../../images/trash.svg';
import deleteIconBlack from '../../images/trash_black.svg';

function SavedNewsCard() {
  const [hovered, setHovered] = React.useState(false);
  const toggleHover = () => setHovered(!hovered);
  return (
    <div className="saved-card">
      <div className="saved-card__image">
        <div className="saved-card__keyword-container">
          <p className="saved-card__keyword-text">Природа</p>
        </div>
        <div className="saved-card__delete-block">
          <div className={hovered ? 'saved-card__offer-delete saved-card__offer-delete_visible' : 'saved-card__offer-delete'}>
            <p className="saved-card__offer-delete-message">Убрать из сохранённых</p>
          </div>
          <button className="saved-card__delete-button" onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <img className="saved-card__delete-icon" src={hovered ? `${deleteIconBlack}` : `${deleteIcon}`} alt="Кнопка удалить"></img>
          </button>
        </div>
      </div>
      <a href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer" className="card__link">
        <div className="saved-card__text-block">
          <p className="saved-card__date">26.12.2020</p>
          <h3 className="saved-card__title">«Первозданная тайга»: новый фотопроект Игоря Шпиленка</h3>
          <p className="saved-card__intro">Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.</p>
          <p className="saved-card__source">СОБАКА.РУ</p>
        </div>
      </a>
    </div>
  );
}

export default SavedNewsCard;
