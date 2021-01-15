import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ERROR_MESSAGES from '../../utils/errorMessages';

function RegisterPopup(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [isDisabled, setDisabled] = React.useState(true);
  const [doesUserExist, setUserExists] = React.useState(false);
  const firstRender = React.useRef(true);

  const formValidation = () => {
    setEmailError('');
    setPasswordError('');
    setNameError('');
    let boolean = false;
    if (!email) {
      setEmailError(ERROR_MESSAGES.BLANK_EMAIL);
      boolean = true;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(ERROR_MESSAGES.WRONG_EMAIL);
      boolean = true;
    } if (!password) {
      setPasswordError(ERROR_MESSAGES.BLANK_PASSWORD);
      boolean = true;
    } if (!name) {
      setNameError(ERROR_MESSAGES.BLANK_NAME);
      boolean = true;
    } if (name === 'Грета') {
      setUserExists(true);
      boolean = true;
    } return boolean;
  };

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setDisabled(formValidation());
  }, [password, email, name]);

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit();
  }

  return (
    <PopupWithForm name="register-popup" button="Зарегистрироваться" title="Регистрация"
      onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit} link="Войти" onLoginClick={props.onLoginClick}>
      <label className="popup__label" htmlFor="email">Email</label>
      <input className="popup__input" id="email" name="email" type="email" placeholder="Введите почту" minLength="2" maxLength="40" onChange={handleChangeEmail} required />
      <span className={formValidation ? 'popup__input-error popup__input-error_visible' : 'popup__input-error'} id="name-input-error">{emailError}</span>
      <label className="popup__label" htmlFor="password-input">Пароль</label>
      <input className="popup__input" id="password" name="password" type="password" placeholder="Введите пароль" onChange={handleChangePassword} required />
      <span className={formValidation ? 'popup__input-error popup__input-error_visible' : 'popup__input-error'} id="name-input-error">{passwordError}</span>
      <label className="popup__label" htmlFor="name">Имя</label>
      <input className="popup__input" id="name" name="email" type="email" placeholder="Введите имя" minLength="2" maxLength="40" onChange={handleChangeName} required />
      <span className={formValidation ? 'popup__input-error popup__input-error_visible' : 'popup__input-error'} id="name-input-error">{nameError}</span>
      <span className={doesUserExist ? 'popup__input-error popup__input-error_visible popup__input-error_user-exists' : 'popup__input-error popup__input-error_user-exists'}>{ERROR_MESSAGES.USER_EXISTS}</span>
      <button className='popup__submit-button popup__submit-button_register' type="submit" disabled={isDisabled} onSubmit={props.onSubmit}>Зарегистрироваться</button>
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
