import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';
// import { MenuIcon } from '@material-ui/icons';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        ></IconButton>
        <Typography variant='h6' className={classes.title}>
          Ryde
        </Typography>
        <Button color='inherit'>
          <a style={{ textDecoration: 'none', color: 'white' }} href='/login'>
            Login
          </a>
        </Button>
        <Button color='inherit'>
          <a
            style={{ textDecoration: 'none', color: 'white' }}
            href='/register'
          >
            Register
          </a>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
