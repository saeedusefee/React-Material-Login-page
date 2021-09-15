import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { FaGoogle } from 'react-icons/fa';
import { setAuthUser, updateLoadUser } from '../../../redux/actions/Auth';
import { Box } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch } from 'react-redux';
import { auth, googleAuthProvider } from './config';
import { fetchError, fetchStart, fetchSuccess } from '../../../redux/actions';

const useStyles = makeStyles(theme => ({
  iconBtn: {
    '&:hover, &:focus': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 6,
    },
  },
}));

const SocialMediaIcons = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const signInUserWithGoogle = () => {
    dispatch(fetchStart());
    try {
      auth
        .signInWithPopup(googleAuthProvider)
        .then(data => {
          dispatch(fetchSuccess());
          dispatch(setAuthUser(data.user));
        })
        .catch(error => {
          dispatch(fetchError(error.message));
        });
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton className={classes.iconBtn} onClick={signInUserWithGoogle}>
        <FaGoogle />
      </IconButton>
    </Box>
  );
};

const Firebase = {
  onRegister: ({ email, password }) => {
    return dispatch => {
      dispatch(fetchStart());
      try {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(data => {
            dispatch(fetchSuccess());
            dispatch(setAuthUser(data));
          })
          .catch(error => {
            dispatch(fetchError(error.message));
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },

  onLogin: ({ email, password }) => {
    return dispatch => {
      try {
        dispatch(fetchStart());
        auth
          .signInWithEmailAndPassword(email, password)
          .then(data => {
            dispatch(fetchSuccess());
            dispatch(setAuthUser(data));
          })
          .catch(error => {
            dispatch(fetchError(error.message));
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },

  onLogout: () => {
    return dispatch => {
      dispatch(fetchStart());
      try {
        auth
          .signOut()
          .then(data => {
            dispatch(fetchSuccess());
            dispatch(setAuthUser(null));
          })
          .catch(error => {
            dispatch(fetchError(error.message));
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },

  getAuthUser: () => {
    return dispatch => {
      dispatch(fetchStart());
      dispatch(updateLoadUser(false));
      try {
        auth.onAuthStateChanged(authUser => {
          dispatch(fetchSuccess());
          if (authUser) {
            dispatch(
              setAuthUser({
                uid: authUser.uid,
                displayName: authUser.displayName,
                email: authUser.email,
                photoURL: authUser.photoURL,
                token: authUser.refreshToken,
              }),
            );
          } else {
            dispatch(updateLoadUser(true));
            dispatch(updateLoadUser(true));
          }
        });
      } catch (error) {
        dispatch(updateLoadUser(true));
        dispatch(fetchError(error.message));
      }
    };
  },

  getSocialMediaIcons: () => {
    return (
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box component="p" fontSize={{ xs: 13, sm: 16 }}>
          یا با گوگل وارد شوید
        </Box>
        <SocialMediaIcons />
      </Box>
    );
  },
};

export default Firebase;
