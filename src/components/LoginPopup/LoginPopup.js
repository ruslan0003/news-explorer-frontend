import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ERROR_MESSAGES from '../../utils/errorMessages';
import { authorize } from '../../utils/MainApi';
import useForm from '../../utils/useForm';

function LoginPopup(props) {
  const [message, setMessage] = React.useState('');

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

  function formReset() {
    document.getElementById('login-popup').reset();
    document.getElementById('login-submit').disabled = true;
  }

  function onSubmitForm({ email, password }) {
    authorize(email, password)
      .then((res) => {
        if (!res || res.status === 401 || res.status === 400) {
          setMessage('Неверно указан email либо пароль');
          props.setLoggedIn(false);
          props.removeToken();
        } else {
          const currentUserData = { email, password };
          props.onSubmit(currentUserData, res.token);
          setMessage('');
          props.setLoggedIn(true);
          formReset();
        }
      })
      .catch((err) => console.log(err));
  }

  const {
    errors,
    dirty,
    handleOnChange,
    handleOnClose,
    isShown,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  function handleClose() {
    handleOnClose();
    props.onClose();
    setMessage('');
    formReset();
  }

  return (
    <PopupWithForm name="login-popup" title="Вход" onClose={handleClose} isOpen={props.isOpen} onSubmit={handleOnSubmit} link="Зарегистрироваться" onRegisterClick={props.onRegisterClick}>
      <label className="popup__label" htmlFor="email">Email</label>
      <input className="popup__input" id="email-login" name="email" type="email" placeholder="Введите почту" minLength="2" maxLength="40" onChange={handleOnChange} required />
      {errors.email && dirty.email && (
        <span className={ isShown ? 'popup__input-error popup__input-error_visible' : 'popup__input-error' } id="email-login-error">{errors.email}</span>
      )}
      <label className="popup__label" htmlFor="password">Пароль</label>
      <input className="popup__input" id="password-login" name="password" type="password" placeholder="Введите пароль" onChange={handleOnChange} required />
      {errors.password && dirty.password && (
        <span className={ isShown ? 'popup__input-error popup__input-error_visible' : 'popup__input-error' } id="password-login-error">{errors.password}</span>
      )}
      <span className={'popup__input-error popup__input-error_visible popup__input-error_center'}>{message}</span>
      <button className='popup__submit-button' id="login-submit" type="submit" disabled={disable}>Войти</button>
    </PopupWithForm>
  );
}

LoginPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onRegisterClick: PropTypes.func,
  onSubmit: PropTypes.func,
  setLoggedIn: PropTypes.func,
  removeToken: PropTypes.func,
};

export default LoginPopup;
