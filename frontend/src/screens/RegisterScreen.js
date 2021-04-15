import React, { useState, useEffect } from 'react';
import { Alert } from '@material-ui/lab';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const checkValidEmail = mail => {
  if (mail === '') {
    return false;
  }
  if (
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      mail.toLowerCase()
    )
  ) {
    return true;
  }
  return false;
};


function RegisterScreen(props) {
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleOnSubmit = async () => {
    if (!checkValidEmail(email)) {
      setErrorMessage('Enter a valid email');
      return;
    }
    let { data } = await axios.post('/api/register', {
      firstName,
      lastName,
      email,
      password
    });
    if (data.redirectUrl) {
      history.push(data.redirectUrl);
    } else {
      if (data.message) {
        setErrorMessage(data.message);
      }
    }
  };
  useEffect(() => {
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
      } else {
        setErrorMessage('');
      }
    } else {
      setErrorMessage('');
    }
  }, [confirmPassword, password]);
  return (
    <Container component='main' maxWidth='xs'>
      {!props.auth ? <Redirect to='/register' /> : <Redirect to='/projects' />}

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete='fname'
              name='firstName'
              variant='outlined'
              required
              fullWidth
              id='firstName'
              label='First Name'
              autoFocus
              onChange={e => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='lastName'
              label='Last Name'
              name='lastName'
              autoComplete='lname'
              onChange={e => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              name='confirmPassword'
              label='Confirm Password'
              type='password'
              id='confirmPassword'
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={handleOnSubmit}
        >
          Sign Up
        </Button>
        {errorMessage ? (
          <Alert
            className={classes.submit}
            style={{
              width: '100%',
              justifyContent: 'center'
            }}
            severity='error'
          >
            {errorMessage}
          </Alert>
        ) : null}
        <Link href='/login' variant='body2'>
          Already have an account?
        </Link>
      </div>
    </Container>
  );
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(RegisterScreen);
