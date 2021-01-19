import React from 'react';
import { Link } from 'react-router-dom';
import githubIcon from '../../images/github-logo.svg';
import instaIcon from '../../images/instagram-logo.svg';

function Footer() {
  return (
    <div className="footer">
      <p className="footer__copyright">&copy; Ruslan Lukichev</p>
      <div className="footer__menu">
        <div className="footer__links">
          <Link to="/" className="footer__link">Главная</Link>
          <a href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a>
        </div>
        <div className="footer__icons">
          <a href="https://github.com/ruslan0003" target="_blank" rel="noreferrer"><img className="footer__icon" src={githubIcon} alt="Иконка Github"></img></a>
          <a href="https://www.instagram.com/rlukichev/" target="_blank" rel="noreferrer" alt="Иконка Instagram"><img className="footer__icon" src={instaIcon}></img></a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
