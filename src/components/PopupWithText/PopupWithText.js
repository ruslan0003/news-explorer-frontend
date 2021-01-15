import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../images/close-icon.svg';

function PopupWithText(props) {
  return (
    <section className={props.isOpen ? 'popup popup_opened' : 'popup'}>
      <div className='popup__container popup__container_info'>
        <button className='popup__close-button' onClick={props.onClose}>
          <img className='popup__close-icon' src={closeIcon} alt="Иконка закрытия модального окна" />
        </button>
        <h3 className='popup__title popup__title_info'>Пользователь успешно зарегистрирован!</h3>
        <button className='popup__link popup__link_login' onClick={props.onLoginClick}>Войти</button>
      </div>
    </section>
  );
}

PopupWithText.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onLoginClick: PropTypes.func,
};

export default PopupWithText;
