import React, { useState } from 'react';
import {
  AppBar,
  Button,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const CreateHardware = props => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [available, setAvailable] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handleOnSubmit = async () => {
    if (name !== '' && available !== '') {
      await axios.post('/api/hardware/create', {
        name,
        available: Number(available)
      });
      setName('');
      setAvailable('');
      setSuccessMessage('Hardware set created!');
    } else {
      setErrorMessage('Please fill out all fields.');
    }
  };
  return (
    <Paper className={classes.paper}>
      <AppBar
        position='static'
        style={{
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          alignItems: 'center'
        }}
      >
        <Typography variant='h6'>Create New Hardware Set</Typography>
      </AppBar>
      <TextField
        variant='filled'
        margin='normal'
        required
        id='Hardware Name'
        label='Hardware Name'
        name='Hardware Name'
        style={{ width: '75%' }}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        variant='filled'
        margin='normal'
        required
        id='Hardware Available'
        label='Hardware Available'
        name='Hardware Available'
        style={{ width: '75%' }}
        onChange={e => setAvailable(e.target.value)}
      />
      <Button
        onClick={handleOnSubmit}
        style={{ paddingTop: 15, paddingBottom: 15 }}
      >
        Create New Hardware <AddToPhotosIcon />
      </Button>
      {errorMessage ? (
        <Alert
          className={classes.submit}
          style={{
            width: '70%',
            justifyContent: 'center'
          }}
          severity='error'
        >
          {errorMessage}
        </Alert>
      ) : null}
      {successMessage ? (
        <Alert
          className={classes.submit}
          style={{
            width: '70%',
            justifyContent: 'center'
          }}
          severity='success'
        >
          {successMessage}
        </Alert>
      ) : null}
    </Paper>
  );
};
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(CreateHardware);
