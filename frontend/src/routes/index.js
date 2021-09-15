import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Error404 from '../Pages/404';
import Login from '../Pages/Auth/Login';
import Profile from '../Pages/user-profile';

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/signin'} />;
  } else if (authUser && location.pathname === '/signin') {
    return <Redirect to={'/signin'} />;
  }

  return (
    <React.Fragment>
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/signin" component={Login} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
