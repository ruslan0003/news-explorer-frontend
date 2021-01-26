import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ERROR_MESSAGES from '../../utils/errorMessages';
import useForm from '../../utils/useForm';
import { register } from '../../utils/MainApi';

function RegisterPopup(props) {
  const [message, setMessage] = React.useState('');

  const stateSchema = {
    email: { value: '', error: '' },
    password: { value: '', error: '' },
    name: { value: '', error: '' },
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
      validator: {
        func: (value) => /.{3,40}/.test(value),
        error: 'Допустимое значение от 3 символов',
      },
    },
    name: {
      requred: true,
      validator: {
        func: (value) => /.{2,40}/.test(value),
        error: 'Допустимое значение от 2 до 40 символов',
      },
    },
  };

  function formReset() {
    document.getElementById('register-popup').reset();
    document.getElementById('register-submit').disabled = true;
  }

  function onSubmitForm({ email, password, name }) {
    register(email, password, name).then((res) => {
      if (res.email && res._id) {
        props.onSubmit(true);
        setMessage('');
        formReset();
      } else if (res.status === 409) {
        props.onSubmit(false);
        setMessage(ERROR_MESSAGES.USER_EXISTS);
      }
    }).catch((err) => {
      setMessage(ERROR_MESSAGES.ERROR_CATCH);
      console.log(err);
    });
  }

  const {
    errors,
    dirty,
    handleOnChange,
    handleOnClose,
    handleOnSubmit,
    isShown,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  function handleClose() {
    handleOnClose();
    props.onClose();
    setMessage('');
    formReset();
  }

  return (
    <PopupWithForm name="register-popup" button="Зарегистрироваться" title="Регистрация"
      onClose={handleClose} isOpen={props.isOpen} onSubmit={handleOnSubmit} link="Войти" onLoginClick={props.onLoginClick}>
      <label className="popup__label" htmlFor="email">Email</label>
      <input className="popup__input" id="email" name="email" type="email" placeholder="Введите почту" onChange={handleOnChange} required />
      {errors.email && dirty.email && (
        <span className={isShown ? 'popup__input-error popup__input-error_visible' : 'popup__input-error'} id="email-register-error">{errors.email}</span>
      )}
      <label className="popup__label" htmlFor="password-input" minLength="3">Пароль</label>
      <input className="popup__input" id="password" name="password" type="password" placeholder="Введите пароль" onChange={handleOnChange} required />
      {errors.password && dirty.password && (
        <span className={isShown ? 'popup__input-error popup__input-error_visible' : 'popup__input-error'} id="password-register-error">{errors.password}</span>
      )}
      <label className="popup__label" htmlFor="name">Имя</label>
      <input className="popup__input" id="name" name="name" placeholder="Введите имя" minLength="2" maxLength="40" onChange={handleOnChange} required />
      {errors.name && dirty.name && (
        <span className={isShown ? 'popup__input-error popup__input-error_visible' : 'popup__input-error'} id="name-register-error">{errors.name}</span>
      )}
      <span className={'popup__input-error popup__input-error_visible popup__input-error_center'}>{message}</span>
      <button className='popup__submit-button popup__submit-button_register' id="register-submit" type="submit" disabled={disable} onSubmit={props.onSubmit}>Зарегистрироваться</button>
    </PopupWithForm >
  );
}

RegisterPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onLoginClick: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default RegisterPopup;
