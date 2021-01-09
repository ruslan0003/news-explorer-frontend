import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import logoutIcon from '../../images/logout.svg';

function SavedNewsHeader(props) {
  return (
    <div className="saved-news-header">
      <div className="saved-news-header__container">
        <Link to="/" className="saved-news-header__logo">NewsExplorer</Link>
        <div className="saved-news-header__menu">
          <NavLink exact to="/" className="saved-news-header__link" activeClassName="saved-news-header__link_active">Главная</NavLink>
          <NavLink to="/saved-news" className="saved-news-header__link" activeClassName="saved-news-header__link_active">Сохранённые статьи</NavLink>
          <button className="saved-news-header__button" onClick={props.onLoginClick}>
            <p className="saved-news-header__name">Руслан</p>
            <img className="saved-news-header__logout" alt="Иконка выхода" src={logoutIcon}></img></button>
        </div>
      </div>

    </div>
  );
}

SavedNewsHeader.propTypes = {
  onLoginClick: PropTypes.func,
};

export default SavedNewsHeader;
