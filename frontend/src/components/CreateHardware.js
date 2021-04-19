import React, { useState } from 'react';
import {
  AppBar,
  Button,
  Paper,
  TextField,
  Typography,
  Snackbar,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
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
const CreateHardware = ({ fetchAllHardwares }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [available, setAvailable] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const successMessage = 'Hardware set created!';
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const handleOnSubmit = async () => {
    if (name !== '' && available !== '') {
      if (Number.isInteger(Number(available))) {
        await axios.post('/api/create', {
          name,
          available: Number(available)
        });
        fetchAllHardwares();
        setName('');
        setAvailable('');
        setErrorSnackbarOpen(false);
        setSuccessSnackbarOpen(true);
      } else {
        setErrorMessage('Please enter number for available.');
        setErrorSnackbarOpen(true);
      }
    } else {
      setErrorMessage('Please fill out all fields.');
      setErrorSnackbarOpen(true);
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
        value={name}
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
        value={available}
        onChange={e => setAvailable(e.target.value)}
      />
      <Button
        onClick={handleOnSubmit}
        style={{ paddingTop: 15, paddingBottom: 15 }}
      >
        Create New Hardware <AddToPhotosIcon />
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={successSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessSnackbarOpen(false)}
        message={successMessage}
        action={
          <React.Fragment>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={() => setSuccessSnackbarOpen(false)}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setErrorSnackbarOpen(false)}
        message={errorMessage}
        action={
          <React.Fragment>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={() => setErrorSnackbarOpen(false)}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
    </Paper>
  );
};
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(CreateHardware);
