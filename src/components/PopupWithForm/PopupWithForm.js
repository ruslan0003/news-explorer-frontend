import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../images/close-icon.svg';

function PopupWithForm(props) {
  function handleOnClose() {
    props.onClose();
    document.getElementById(props.name).reset();
  }

  return (
    <section className={props.isOpen ? `popup ${props.name} popup_opened` : `popup ${props.name}`}>
      <div className='popup__container'>
        <button className='popup__close-button' onClick={handleOnClose}>
          <img className='popup__close-icon' src={closeIcon} alt="Иконка закрытия модального окна" />
        </button>
        <h3 className='popup__title'>{props.title}</h3>
        <form className={`popup__form ${props.name}__form`} name={props.name} id={props.name} noValidate onSubmit={props.onSubmit}>
          {props.children}
        </form>
        <div className='popup__link-text'>или <button className='popup__link' onClick={props.name === 'login-popup' ? props.onRegisterClick : props.onLoginClick}>{props.link}</button></div>
      </div>
    </section>
  );
}

PopupWithForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  name: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  onRegisterClick: PropTypes.func,
  onLoginClick: PropTypes.func,
  link: PropTypes.string,
};

export default PopupWithForm;
