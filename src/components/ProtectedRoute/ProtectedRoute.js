import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { loggedIn, children, ...rest } = props;
  return loggedIn ? <Route {...rest}>{children}</Route> : <Redirect to='/saved-news' />;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  loggedIn: PropTypes.bool,
  children: PropTypes.array,
};
