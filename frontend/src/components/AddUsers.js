import React, { useState, useEffect } from 'react';
import {
  AppBar,
  IconButton,
  Button,
  Snackbar,
  Typography,
  Paper,
  TextField
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
const AddUsers = ({ auth, fetchAllProjects }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const errorMessage = 'Please fill out all fields.';
  const successMessage = 'Project created!';
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const [hardwareSets, setHardwareSets] = useState([]);
  useEffect(async () => {
    const res = await axios.get('/api/hardware/all');
    setHardwareSets(res.data);
  }, [auth]);
  const handleOnSubmit = async () => {
    if (name !== '' && description !== '') {
      const checkedOut = await axios.post('/api/checked/create', {
        hardwareSets
      });
      await axios.post('/api/projects/create', {
        projectName: name,
        description,
        checkedOut: checkedOut.data,
        creator: auth.email
      });
      fetchAllProjects();
      setName('');
      setDescription('');
      setSuccessSnackbarOpen(true);
    } else {
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
        <Typography variant='h6'>Add Users To Project</Typography>
      </AppBar>

      <TextField
        variant='filled'
        margin='normal'
        required
        id='Project Name'
        label='Project Name'
        name='Project Name'
        style={{ width: '75%' }}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        variant='filled'
        margin='normal'
        required
        id='Project Description'
        label='Project Description'
        name='Project Description'
        style={{ width: '75%' }}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <Button
        onClick={handleOnSubmit}
        style={{ paddingTop: 15, paddingBottom: 15 }}
      >
        Create New Project <AddToPhotosIcon />
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
export default connect(mapStateToProps)(AddUsers);
