import React from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../../images/trash.svg';
import deleteIconBlack from '../../images/trash_black.svg';

function SavedNewsCard(props) {
  const [hovered, setHovered] = React.useState(false);
  const toggleHover = () => setHovered(!hovered);
  function deleteSavedCard() {
    props.onCardDelete(props.savedCard);
  }

  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  const changedDate = props.dateFormat(props.savedCard.date);

  const keyword = capitalize(props.savedCard.keyword);
  return (
    <div className="saved-card">
      <div className="saved-card__image-block">
      <img className="saved-card__image" src={`${props.savedCard.image}`} alt={`${props.savedCard.title}`}></img>
        <div className="saved-card__keyword-container">
          <p className="saved-card__keyword-text">{keyword}</p>
        </div>
        <div className="saved-card__delete-block">
          <div className={hovered ? 'saved-card__offer-delete saved-card__offer-delete_visible' : 'saved-card__offer-delete'}>
            <p className="saved-card__offer-delete-message">Убрать из сохранённых</p>
          </div>
          <button className="saved-card__delete-button" onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={deleteSavedCard}>
            <img className="saved-card__delete-icon" src={hovered ? `${deleteIconBlack}` : `${deleteIcon}`} alt="Кнопка удалить"></img>
          </button>
        </div>
      </div>
      <a href={`${props.savedCard.link}`} target="_blank" rel="noreferrer" className="card__link">
        <div className="saved-card__text-block">
          <p className="saved-card__date">{changedDate}</p>
          <h3 className="saved-card__title">{props.savedCard.title}</h3>
          <p className="saved-card__intro">{props.savedCard.text}</p>
          <p className="saved-card__source">{props.savedCard.source}</p>
        </div>
      </a>
    </div>
  );
}

export default SavedNewsCard;

SavedNewsCard.propTypes = {
  savedCard: PropTypes.object,
  onCardDelete: PropTypes.func,
  dateFormat: PropTypes.func,
};
