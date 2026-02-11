import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function MyRoute({ component: Component, isClosed, ...rest }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isClosed && !isLoggedIn) {
    //Se a rota é fechada e o usuario não tiver logado ele vai ser redicionado para login
    return <Redirect to={{ pathname: '/', state: { prevPath: rest.location.pathname } }} />;
  }

  if (!isClosed && isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={Component} />;
}

/*
MyRoute.defaultProps = {
  isClosed: false
};
*/

MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isClosed: PropTypes.bool
};
