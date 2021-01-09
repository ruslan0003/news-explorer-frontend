import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function LoginPopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
  }
  return (
    <PopupWithForm name="login-popup" title="Вход" button="Войти" onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit} link="Зарегистрироваться" onRegisterClick={props.onRegisterClick}>
      <label className="popup__label" htmlFor="login-email">Email</label>
      <input className="popup__input" id="login-email" name="login-email" type="email" placeholder="Введите почту" minLength="2" maxLength="40" required />
      <label className="popup__label" htmlFor="login-password">Пароль</label>
      <input className="popup__input" id="login-password" name="login-password" type="password" placeholder="Введите пароль" required />
    </PopupWithForm>
  );
}

LoginPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onRegisterClick: PropTypes.func,
};

export default LoginPopup;
