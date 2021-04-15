import React, { useState } from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
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
const CreateProject = props => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handleOnSubmit = async () => {
    if (name !== '' && description !== '') {
      await axios.post('/api/create', {
        projectName: name,
        description,
        creator: props.auth.email
      });
      window.location.reload();
      setSuccessMessage('Project created!');
    } else {
      setErrorMessage('Please fill out all fields.');
    }
  };
  return (
    <Grid item xs={4}>
      <Paper className={classes.paper}>
        <TextField
          variant='filled'
          margin='normal'
          required
          id='Project Name'
          label='Project Name'
          name='Project Name'
          style={{ width: '75%' }}
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
          onChange={e => setDescription(e.target.value)}
        />
        <Button
          onClick={handleOnSubmit}
          style={{ paddingTop: 15, paddingBottom: 15 }}
        >
          Create New Project <AddToPhotosIcon />
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
    </Grid>
  );
};
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(CreateProject);
