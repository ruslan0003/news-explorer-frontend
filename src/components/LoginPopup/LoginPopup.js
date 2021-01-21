import PropTypes from 'prop-types';
import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ERROR_MESSAGES from '../../utils/errorMessages';
import { authorize } from '../../utils/MainApi';
import useForm from '../../utils/useForm';

function LoginPopup(props) {
  const stateSchema = {
    email: { value: '', error: '' },
    password: { value: '', error: '' },
  };

  const stateValidatorSchema = {
    email: {
      required: true,
      validator: {
        func: (value) => /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value),
        error: ERROR_MESSAGES.WRONG_EMAIL,
      },
    },
    password: {
      required: true,
    },
  };

  const {
    values,
    errors,
    dirty,
    handleOnChange,
    handleOnSubmit,
    disable,
  // eslint-disable-next-line no-use-before-define
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  const { email, password } = values;

  function onSubmitForm() {
    authorize(email, password)
      .then((res) => {
        const currentUserData = { email, password };
        props.onSubmit(currentUserData, res.token);
        console.log(currentUserData);
      })
      .catch((err) => console.log(err));
  }

  return (
    <PopupWithForm name="login-popup" title="Вход" onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleOnSubmit} link="Зарегистрироваться" onRegisterClick={props.onRegisterClick}>
      <label className="popup__label" htmlFor="email">Email</label>
      <input className="popup__input" id="email-login" name="email" type="email" placeholder="Введите почту" minLength="2" maxLength="40" onChange={handleOnChange} required />
      {errors.email && dirty.email && (
        <span className='popup__input-error popup__input-error_visible' id="email-login-error">{errors.email}</span>
      )}
      <label className="popup__label" htmlFor="password">Пароль</label>
      <input className="popup__input" id="password-login" name="password" type="password" placeholder="Введите пароль" onChange={handleOnChange} required />
      {errors.password && dirty.password && (
        <span className='popup__input-error popup__input-error_visible' id="password-login-error">{errors.password}</span>
      )}
      <button className='popup__submit-button' type="submit" disabled={disable}>Войти</button>
    </PopupWithForm>
  );
}

LoginPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onRegisterClick: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default LoginPopup;
