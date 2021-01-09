import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

function Header(props) {
  return (
    <div className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">NewsExplorer</Link>
        <div className="header__menu">
          <NavLink exact to="/" className="header__link" activeClassName="header__link_active">Главная</NavLink>
          <NavLink to="/saved-news" className="header__link" activeClassName="header__link_active">Сохранённые статьи</NavLink>
          <button className="header__button" onClick={props.onLoginClick}>Авторизоваться</button>
        </div>
      </div>

    </div>
  );
}

Header.propTypes = {
  onLoginClick: PropTypes.func,
};

export default Header;
