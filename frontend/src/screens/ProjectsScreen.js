import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  Grid,
  Typography,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import CreateProject from '../components/CreateProject';
import ProjectTable from '../components/ProjectTable';

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
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
const ProjectsScreen = props => {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [openedProject, setOpenedProject] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState('');
  const [successSnackbar, setSuccessSnackbar] = useState('');
  const onOpenProject = project => {
    setOpenModal(true);
    setOpenedProject(project);
  };
  useEffect(() => {
    axios.get('/api/projects').then(projects => {
      setProjects(projects.data);
    });
  }, [props.auth, projects]);

  return (
    <Grid container spacing={1}>
      {!props.auth ? <Redirect to='/login' /> : <Redirect to='/projects' />}

      <Grid container item xs={12} spacing={3}>
        <React.Fragment>
          <CreateProject />
          <ProjectTable projects={projects} onOpenProject={onOpenProject} />
        </React.Fragment>
      </Grid>
      {successSnackbar ? (
        <Snackbar
          open
          autoHideDuration={6000}
          onClose={() => {
            setSuccessSnackbar('');
          }}
        >
          <Alert autoHideDuration={100} severity='success'>
            {successSnackbar}
          </Alert>
        </Snackbar>
      ) : null}
      {errorSnackbar ? (
        <Snackbar
          open
          autoHideDuration={6000}
          onClose={() => {
            setErrorSnackbar('');
          }}
        >
          <Alert autoHideDuration={100} severity='error'>
            {errorSnackbar}
          </Alert>
        </Snackbar>
      ) : null}
      {openModal ? (
        <Dialog
          maxWidth='md'
          fullWidth
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby='form-dialog-title'
        >
          <AppBar
            position='static'
            style={{
              paddingTop: '1rem',
              paddingBottom: '1rem',
              alignItems: 'center'
            }}
          >
            <Typography align='center'>
              {openedProject.projectName} - {openedProject.creator}
            </Typography>
          </AppBar>
          <DialogContent>
            <Typography align='center'>{openedProject.description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)} color='primary'>
              Cancel
            </Button>
            <Button onClick={() => setOpenModal(false)} color='primary'>
              Make Changes
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </Grid>
  );
};
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(ProjectsScreen);
