import React, { useState } from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';

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
const ProjectsScreen = props => {
  const classes = useStyles();
  const handleOnSubmit = async () => {
    console.log(name, description, props.auth.email);
    if (name !== '' && description !== '') {
      await axios.post('/api/create', {
        projectName: name,
        description,
        creator: props.auth.email
      });
      setSuccessMessage('Project created!');
    } else {
      setErrorMessage('Please fill out all fields.');
    }
  };
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  return (
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={3}>
        <React.Fragment>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='Project Name'
                label='Project Name'
                name='Project Name'
                onChange={e => setName(e.target.value)}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='Project Description'
                label='Project Description'
                name='Project Description'
                onChange={e => setDescription(e.target.value)}
              />
              <Button onClick={handleOnSubmit}>
                Create New Project <AddToPhotosIcon />
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
              {successMessage ? (
                <Alert
                  className={classes.submit}
                  style={{
                    width: '100%',
                    justifyContent: 'center'
                  }}
                  severity='success'
                >
                  {successMessage}
                </Alert>
              ) : null}
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <div>
                <table>
                  <tr>
                    <th>Name     </th>
                    <th>ID     </th>
                    <th>Description     </th>
                    <th>Link to Open</th>
                  </tr>
                </table>
              </div>
            </Paper>
          </Grid>
        </React.Fragment>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(ProjectsScreen);
