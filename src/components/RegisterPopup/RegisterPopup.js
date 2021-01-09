import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function RegisterPopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
  }
  return (
    <PopupWithForm name="register-popup" button="Зарегистрироваться" title="Регистрация"
    onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit} link="Войти" onLoginClick={props.onLoginClick}>
      <label className="popup__label" htmlFor="email">Email</label>
      <input className="popup__input" id="email" name="email" type="email" placeholder="Введите почту" minLength="2" maxLength="40" required />
      <label className="popup__label" htmlFor="password-input">Пароль</label>
      <input className="popup__input" id="password" name="password" type="password" placeholder="Введите пароль" required />
      <label className="popup__label" htmlFor="name">Имя</label>
      <input className="popup__input" id="name" name="email" type="email" placeholder="Введите имя" minLength="2" maxLength="40" required />
    </PopupWithForm>
  );
}

RegisterPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onLoginClick: PropTypes.func,
};

export default RegisterPopup;
