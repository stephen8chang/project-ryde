import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';
import {
  Avatar,
  Container,
  Button,
  CssBaseline,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function LoginScreen() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleOnSubmit = async () => {
    let { data } = await axios.post('/api/login', { email, password });
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
    } else {
      if (data.message) {
        setErrorMessage(data.message);
      }
    }
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={handleOnSubmit}
        >
          Sign In
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
        <Link href='/register' variant='body2'>
          Don't have an account?
        </Link>
      </div>
    </Container>
  );
}
