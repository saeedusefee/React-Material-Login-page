import React from 'react';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  errorNumber: {
    color: theme.palette.text.primary,
    fontWeight: 800,
    lineHeight: 1,
    marginBottom: 30,
    textShadow: '10px 6px 8px hsla(0,0%,45.9%,.8)',
  },
}));

const Error404 = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box fontSize={{ xs: 100, sm: 160 }} className={classes.errorNumber}>
        404
      </Box>
      <Box mt={8}>
        <Button variant="contained" color="primary">
          صفحه اصلی
        </Button>
      </Box>
    </Box>
  );
};

export default Error404;
