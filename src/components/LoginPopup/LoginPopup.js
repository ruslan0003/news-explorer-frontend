import PropTypes from 'prop-types';
import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ERROR_MESSAGES from '../../utils/errorMessages';

function LoginPopup(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [isDisabled, setDisabled] = React.useState(true);
  const firstRender = React.useRef(true);

  // временное решение для валидации форм
  // с целью демонстрации стилизованных сообщений об ошибках
  // и состояний кнопки submit

  const formValidation = () => {
    setEmailError('');
    setPasswordError('');
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
    } return boolean;
  };

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setDisabled(formValidation());
  }, [password, email]);

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit();
  }

  return (
    <PopupWithForm name="login-popup" title="Вход" onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit} link="Зарегистрироваться" onRegisterClick={props.onRegisterClick}>
      <label className="popup__label" htmlFor="login-email">Email</label>
      <input className="popup__input" id="login-email" name="login-email" type="email" value={email || ''} placeholder="Введите почту" minLength="2" maxLength="40" onChange={handleChangeEmail} required />
      <span className={formValidation ? 'popup__input-error popup__input-error_visible' : 'popup__input-error'} id="name-login-error">{emailError}</span>
      <label className="popup__label" htmlFor="login-password">Пароль</label>
      <input className="popup__input" id="login-password" name="login-password" type="password" value={password || ''} placeholder="Введите пароль" onChange={handleChangePassword} required />
      <span className={formValidation ? 'popup__input-error popup__input-error_visible' : 'popup__input-error'} id="password-login-error">{passwordError}</span>
      <button className='popup__submit-button' type="submit" disabled={isDisabled}>Войти</button>
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
