import React from 'react';
import bookmark from '../../images/bookmark-icon.svg';
import bookmarkBlack from '../../images/bookmark-icon_black.svg';

function NewsCard() {
  const [hovered, setHovered] = React.useState(false);
  const toggleHover = () => setHovered(!hovered);
  return (
    <div className="card">
      <div className="card__image">
        <div className={hovered ? 'card__offer-login card__offer-login_visible' : 'card__offer-login'}>
          <p className="card__offer-login-message">Войдите, чтобы сохранять статьи</p>
        </div>
        <button className="card__bookmark-button" onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
          <img className="card__bookmark-icon" src={hovered ? `${bookmarkBlack}` : `${bookmark}`} alt="Кнопка добавить в избранное"></img>
        </button>
      </div>
      <div className="card__text-block">
        <p className="card__date">26.12.2020</p>
        <h3 className="card__title">«Первозданная тайга»: новый фотопроект Игоря Шпиленка</h3>
        <p className="card__intro">Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.</p>
        <p className="card__source">СОБАКА.РУ</p>
      </div>
    </div>
  );
}

export default NewsCard;
