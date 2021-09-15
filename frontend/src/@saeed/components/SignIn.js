import React, { useState } from 'react';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Box, InputLabel, OutlinedInput } from '@material-ui/core';
import { AuhMethods } from '../../services/auth';
import ContentLoader from '../ContentLoader';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: props => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
  inputAdornmentIconPostion: {
    order: 1,
  },
  TextFieldPassword: {
    width: '25ch',
  },
  OutlinedInputMargin: {
    margin: theme.spacing(1),
  },
}));

//variant = 'default', 'standard'
//method = 'jwtAuth', 'firebase'
const SignIn = ({ method = 'firebase', variant = 'default', wrapperVariant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles({ variant });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onSubmit = () => {
    dispatch(AuhMethods[method].onLogin({ email, password }));
  };

  return (
    <AuthWrapper variant={wrapperVariant}>
      <Box className={classes.authContent}>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          سامانه مدیریت آموزش تراز
        </Typography>
        <form>
          <Box mb={2}>
            <TextField
              label="نام کاربری"
              placeholder="ایمیل خود را وارد کنید"
              required
              fullWidth
              onChange={event => setEmail(event.target.value)}
              defaultValue={email}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={2}>
            <FormControl className={clsx(classes.OutlinedInputMargin)} fullWidth variant="outline">
              <InputLabel htmlFor="outlined-adornment-password">رمز عبور</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                required
                onChange={event => setPassword(event.target.value)}
                value={password}
                margin="normal"
                className={classes.textFieldRoot}
                endAdornment={
                  <InputAdornment className={classes.inputAdornmentIconPostion} position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/forgot-password">رمز عبور خود را فراموش کرده ام</NavLink>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <Button onClick={onSubmit} variant="contained" color="primary">
              ورود
            </Button>
          </Box>
        </form>

        {dispatch(AuhMethods[method].getSocialMediaIcons())}

        <ContentLoader />
      </Box>
    </AuthWrapper>
  );
};

export default SignIn;
