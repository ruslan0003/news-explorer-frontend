import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import logoutIconWhite from '../../images/logout_white.svg';
import openMenuIcon from '../../images/menu.svg';
import closeMenuIcon from '../../images/close-icon.svg';

function Header(props) {
  const name = props.userName;
  return (
    props.isLoggedIn ? <div className="header">
      <div className={props.isMenuOpen ? 'header__container header__container_dark' : 'header__container'} >
        <div className="header__logo-menu-line">
          <Link to="/" className="header__logo">NewsExplorer</Link>
          <button className="header__menu-open" onClick={props.onMenuOpenClick}>
            <img className="header__menu-open-icon" alt="Кнопка открыть меню" src={props.isMenuOpen ? closeMenuIcon : openMenuIcon}></img>
          </button>
        </div>
        <div className={props.isMenuOpen ? 'header__menu' : 'header__menu header__menu_hidden'}>
          <NavLink exact to="/" className="header__link" activeClassName="header__link_active">Главная</NavLink>
          <NavLink to="/saved-news" className="header__link" activeClassName="header__link_active">Сохранённые статьи</NavLink>
          <button className="header__button-logout" onClick={props.onLogoutClick}>
            <span className="header__username">{name}</span>
            <img className="header__logout-icon" alt="Иконка выхода" src={logoutIconWhite}></img></button>
        </div>
      </div>
    </div>
      : <div className="header">
        <div className={props.isMenuOpen ? 'header__container header__container_dark' : 'header__container'} >
          <div className="header__logo-menu-line">
            <Link to="/" className="header__logo">NewsExplorer</Link>
            <button className="header__menu-open" onClick={props.onMenuOpenClick}>
              <img className="header__menu-open-icon" alt="Кнопка открыть меню" src={props.isMenuOpen ? closeMenuIcon : openMenuIcon}></img>
            </button>
          </div>
          <div className={props.isMenuOpen ? 'header__menu' : 'header__menu header__menu_hidden'}>
            <NavLink exact to="/" className="header__link" activeClassName="header__link_active">Главная</NavLink>
            <button className="header__button" onClick={props.onLoginClick}>Авторизоваться</button>
          </div>
        </div>
      </div>
  );
}

Header.propTypes = {
  onLoginClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  onMenuOpenClick: PropTypes.func,
  isMenuOpen: PropTypes.bool,
  userName: PropTypes.string,
};

export default Header;
