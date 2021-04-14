import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  Grid,
  Paper,
  TextField,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent
} from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
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
  const [currProj, setCurrProj] = useState({
    creator: '',
    projectName: '',
    description: '',
    HW1Amt: 0,
    HW2Amt: 0,
    access: false
  });
  const [openModal, setOpenModal] = useState(false);
  const [hardware1, setHardware1] = useState(0);
  const [hardware2, setHardware2] = useState(0);

  const [hw1Curr, sethw1Curr] = useState(0);
  const [hw2Curr, sethw2Curr] = useState(0);
  const [hw1Av, sethw1Av] = useState(0);
  const [hw2Av, sethw2Av] = useState(0);

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
  useEffect(() => {
    axios.get('/api/projects').then(projects => {
      setProjects(projects.data);
    });
    axios.get('/api/hardware/1').then(hw => sethw1Av(hw.data.available));
    axios.get('/api/hardware/2').then(hw => sethw2Av(hw.data.available));
    projects.forEach(project => {
      if (project._id === currProj.id) {
        sethw1Curr(project.HW1Amt);
        sethw2Curr(project.HW2Amt);
      }
    });
  }, [props.auth, currProj]);

  const displayCurrProj = project => {
    setCurrProj({
      ...currProj,
      creator: project.creator,
      projectName: project.projectName,
      description: project.description,
      HW1Amt: project.HW1Amt,
      HW2Amt: project.HW2Amt,
      access: project.access,
      id: project._id
    });
  };
  const updateAmounts = (hw1Curr, hw2Curr, hw1Av, hw2Av) => {
    sethw1Curr(hw1Curr);
    sethw2Curr(hw2Curr);
    sethw1Av(hw1Av);
    sethw2Av(hw2Av);
  };
  const [name, setName] = useState('');
  const [modalName, setModalName] = useState('');
  const [modalCreator, setModalCreator] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorSnackbar, setErrorSnackbar] = useState('');
  const [successSnackbar, setSuccessSnackbar] = useState('');
  const handleMakeChanges = () => {
    if (hw1Curr < 0 || hw2Curr < 0) {
      setErrorSnackbar('You returned too many sets');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (hw1Av < 0 || hw2Av < 0) {
      setErrorSnackbar('You checked out too many sets');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      axios.post('/api/projects/count', { id: currProj.id, hw1Curr, hw2Curr });
      axios.post('/api/hardware/count', {
        hardware1,
        hardware2
      });
      setHardware1(0);
      setHardware2(0);
      setSuccessSnackbar('Submitted successfully!');
    }
  };
  return (
    <Grid container spacing={1}>
      {!props.auth ? <Redirect to='/login' /> : <Redirect to='/projects' />}

      <Grid container item xs={12} spacing={3}>
        <React.Fragment>
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
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Project Name</TableCell>
                      <TableCell align='center'>Project Description</TableCell>
                      <TableCell align='center'>Creator</TableCell>
                      <TableCell align='center'>ID</TableCell>
                      <TableCell align='center'>Link</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.map(project => (
                      <TableRow key={project.projectName}>
                        <TableCell component='th' scope='row' align='center'>
                          {project.projectName}
                        </TableCell>
                        <TableCell align='center'>
                          {project.description}
                        </TableCell>
                        <TableCell align='center'>{project.creator}</TableCell>
                        <TableCell align='center'>{project._id}</TableCell>
                        <TableCell align='center'>
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                              displayCurrProj(project);
                              setOpenModal(true);
                              setModalName(project.projectName);
                              setModalCreator(project.creator);
                              setModalDescription(project.description);
                            }}
                          >
                            Open
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            {currProj.projectName ? (
              <div>
                <p>
                  Creator: {currProj.creator}, ID: {currProj.id}
                </p>
                <div>
                  <button
                    onClick={() => {
                      setHardware1(hardware1 => hardware1 + 1);
                      updateAmounts(hw1Curr - 1, hw2Curr, hw1Av + 1, hw2Av);
                    }}
                  >
                    Return (-1)
                  </button>
                  <button
                    onClick={() => {
                      setHardware1(hardware1 => hardware1 - 1);

                      updateAmounts(hw1Curr + 1, hw2Curr, hw1Av - 1, hw2Av);
                    }}
                  >
                    Check Out (+1){' '}
                  </button>
                  <p>HWSet1 Checked Out: {hw1Curr}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setHardware2(hardware2 => hardware2 + 1);

                      updateAmounts(hw1Curr, hw2Curr - 1, hw1Av, hw2Av + 1);
                    }}
                  >
                    Return (-1)
                  </button>
                  <button
                    onClick={() => {
                      setHardware2(hardware2 => hardware2 - 1);

                      updateAmounts(hw1Curr, hw2Curr + 1, hw1Av, hw2Av - 1);
                    }}
                  >
                    Check Out (+1)
                  </button>
                  <p>HWSet2 Checked Out: {hw2Curr}</p>
                </div>
                <p>HWSet1 Available: {hw1Av}</p>
                <p>HWSet2 Available: {hw2Av}</p>
                <button onClick={handleMakeChanges}>Make Changes</button>
              </div>
            ) : null}
          </Grid>
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
              {modalName} - {modalCreator}
            </Typography>
          </AppBar>
          <DialogContent>
            <Typography align='center'>{modalDescription}</Typography>
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
