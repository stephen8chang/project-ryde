import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';
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
const NavBar = props => {
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
          {props.auth ? `Welcome ${props.auth.firstName}` : 'Ryde'}
        </Typography>
        {props.auth ? (
          <>
            <Button color='inherit'>
              <a style={{ textDecoration: 'none', color: 'white' }} href='/'>
                Home
              </a>
            </Button>
            <Button color='inherit'>
              <a
                style={{ textDecoration: 'none', color: 'white' }}
                href='/projects'
              >
                Projects
              </a>
            </Button>
            <Button color='inherit'>
              <a
                style={{ textDecoration: 'none', color: 'white' }}
                href='/dataset'
              >
                Dataset
              </a>
            </Button>
            <Button color='inherit'>
              <a
                style={{ textDecoration: 'none', color: 'white' }}
                href='/api/logout'
              >
                Logout
              </a>
            </Button>
          </>
        ) : (
          <>
            <Button color='inherit'>
              <a
                style={{ textDecoration: 'none', color: 'white' }}
                href='/login'
              >
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
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(NavBar);
