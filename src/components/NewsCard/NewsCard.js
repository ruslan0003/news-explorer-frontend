import React from 'react';
import PropTypes from 'prop-types';
import bookmark from '../../images/bookmark-icon.svg';
import bookmarkBlack from '../../images/bookmark-icon_black.svg';
import bookmarkBlue from '../../images/bookmark-icon_blue.svg';

function NewsCard(props) {
  const [hovered, setHovered] = React.useState(false);
  const [favourite, setFavourite] = React.useState(false);
  const [selected, setSelected] = React.useState(bookmark);

  const toggleHover = () => setHovered(!hovered);

  function checkIfSaved() {
    if (props.savedCards.some((item) => props.card.title === item.title)) {
      setFavourite(true);
      setSelected(bookmarkBlue);
    } else {
      setFavourite(false);
      setSelected(bookmark);
    }
  }

  function getCardToDelete() {
    const cardToDelete = props.savedCards.map((item) => {
      if (props.card.title === item.title) {
        return item;
      }
      return null;
    });
    let cardObject = {};
    cardObject = cardToDelete.filter((element) => element !== null);
    return cardObject;
  }

  React.useEffect(() => {
    checkIfSaved();
  });

  function toggleIconState() {
    checkIfSaved();
    if (selected !== bookmarkBlue) {
      setSelected(bookmarkBlue);
      setFavourite(true);
      props.saveCard(props.card);
    } else {
      setSelected(bookmarkBlack);
      setFavourite(false);
      const cardToBeDeleted = getCardToDelete();
      props.onCardDelete(cardToBeDeleted[0]);
    }
  }

  function handleOnMouseEnter() {
    if (!favourite) {
      setSelected(bookmarkBlack);
    }
  }

  function handleOnMouseLeave() {
    if (!favourite) {
      setSelected(bookmark);
    }
  }

  return (
    props.isLoggedIn ? <div className="card">
      <div className="card__image-block">
        <img className="card__image" src={`${props.card.image}`} alt={`${props.card.title}`}></img>
        <button className="card__bookmark-button" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} onClick={toggleIconState}>
          <img className="card__bookmark-icon" src={selected} alt="Кнопка добавить в избранное"></img>
        </button>
      </div>
      <a href={`${props.card.link}`} target="_blank" rel="noreferrer" className="card__link">
        <div className="card__text-block">
          <p className="card__date">{props.card.date}</p>
          <h3 className="card__title">{props.card.title}</h3>
          <p className="card__intro">{props.card.intro}</p>
          <p className="card__source">{props.card.source}</p>
        </div>
      </a>
    </div >
      : <div className="card">
        <div className="card__image-block">
          <img className="card__image" src={`${props.card.image}`} alt={`${props.card.title}`}></img>

          <div className={hovered ? 'card__offer-login card__offer-login_visible' : 'card__offer-login'}>
            <p className="card__offer-login-message">Войдите, чтобы сохранять статьи</p>
          </div>
          <button className="card__bookmark-button" onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <img className="card__bookmark-icon" src={hovered ? `${bookmarkBlack}` : `${bookmark}`} alt="Кнопка добавить в избранное"></img>
          </button>
        </div>

        <a href={`${props.card.link}`} target="_blank" rel="noreferrer" className="card__link">
          <div className="card__text-block">
            <p className="card__date">{props.card.date}</p>
            <h3 className="card__title">{props.card.title}</h3>
            <p className="card__intro">{props.card.intro}</p>
            <p className="card__source">{props.card.source}</p>
          </div>
        </a>
      </div>
  );
}

NewsCard.propTypes = {
  isLoggedIn: PropTypes.bool,
  card: PropTypes.object,
  saveCard: PropTypes.func,
  savedCards: PropTypes.array,
  onCardDelete: PropTypes.func,
  cards: PropTypes.array,
};

export default NewsCard;
