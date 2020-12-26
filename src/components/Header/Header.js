import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="header__container">
        <p className="header__logo">NewsExplorer</p>
        <div className="header__menu">
          <NavLink exact to="/" className="header__link" activeClassName="header__link_active">Главная</NavLink>
          <NavLink to="/1" className="header__link" activeClassName="header__link_active">Ссылка</NavLink>
          <NavLink to="/2" className="header__link" activeClassName="header__link_active">Ссылка</NavLink>
          <button className="header__button">Авторизоваться</button>
        </div>
      </div>

    </div>
  );
}

export default Header;
