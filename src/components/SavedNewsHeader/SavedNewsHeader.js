import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import logoutIcon from '../../images/logout.svg';
import logoutIconWhite from '../../images/logout_white.svg';
import openMenuIconBlack from '../../images/menu-black.svg';
import closeMenuIcon from '../../images/close-icon.svg';

function SavedNewsHeader(props) {
  const name = props.userName;
  return (
      <div className="saved-news-header">
    <div className={ props.isMenuOpen ? 'saved-news-header__container saved-news-header__container_dark' : 'saved-news-header__container' } >
      <div className="saved-news-header__logo-menu-line">
      <Link to="/" className={ props.isMenuOpen ? 'saved-news-header__logo saved-news-header__logo_white' : 'saved-news-header__logo' }>NewsExplorer</Link>
      <button className="saved-news-header__menu-open" onClick={props.onMenuOpenClick}>
        <img className="saved-news-header__menu-open-icon" alt="Кнопка открыть меню" src={props.isMenuOpen ? closeMenuIcon : openMenuIconBlack }></img>
      </button>
      </div>
      <div className={ props.isMenuOpen ? 'saved-news-header__menu' : 'saved-news-header__menu saved-news-header__menu_hidden' }>
      <NavLink exact to="/" className="saved-news-header__link" activeClassName="saved-news-header__link_active">Главная</NavLink>
          <NavLink to="/saved-news" className="saved-news-header__link" activeClassName="saved-news-header__link_active">Сохранённые статьи</NavLink>
          <button className="saved-news-header__button-logout" onClick={props.onLogoutClick}>
            <p className="saved-news-header__username">{name}</p>
            <img className="saved-news-header__logout-icon" alt="Иконка выхода" src={props.isMenuOpen ? logoutIconWhite : logoutIcon}></img></button>
        </div>
      </div>
    </div>
  );
}

SavedNewsHeader.propTypes = {
  onLogoutClick: PropTypes.func,
  onMenuOpenClick: PropTypes.func,
  isMenuOpen: PropTypes.bool,
  userName: PropTypes.string,
};

export default SavedNewsHeader;
