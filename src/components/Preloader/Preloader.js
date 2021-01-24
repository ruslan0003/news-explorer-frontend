import React from 'react';
import PropTypes from 'prop-types';

function Preloader(props) {
  return (
    <div className={props.isLoading ? 'preloader' : 'preloader preloader_hidden'}>
      <i className="preloader__circle"></i>
    </div>
  );
}

export default Preloader;

Preloader.propTypes = {
  isLoading: PropTypes.bool,
};
