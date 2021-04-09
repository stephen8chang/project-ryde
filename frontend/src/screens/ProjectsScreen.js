import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Paper,
  TextField,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer
} from '@material-ui/core';
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
  const [projects, setProjects] = useState([]);
  const [currProj, setCurrProj] = useState({
    creator: "",
    projectName: "",
    description: "",
    HW1Amt: 0,
    HW2Amt: 0,
    access: false
  });
  const [num, setNum] = useState(0)
  const [hw1Curr, sethw1Curr] = useState(0)
  const [hw2Curr, sethw2Curr] = useState(0)
  const [hw1Av, sethw1Av] = useState(0)
  const [hw2Av, sethw2Av] = useState(0)

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
  }, [props.auth]);
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
    })
    console.log(currProj);
    //window.location.reload();
  };
  const updateAmounts = (hw1Curr, hw2Curr, hw1Av, hw2Av) => {
    sethw1Curr(hw1Curr)
    sethw2Curr(hw2Curr)
    sethw1Av(hw1Av)
    sethw2Av(hw2Av)
  }
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
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='right'>Project Name</TableCell>
                      <TableCell align='right'>Project Description</TableCell>
                      <TableCell align='right'>Creator</TableCell>
                      <TableCell align='right'>ID</TableCell>
                      <TableCell align='right'>Link</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.map(project => (
                      <TableRow key={project.projectName}>
                        <TableCell component='th' scope='row'>
                          {project.projectName}
                        </TableCell>
                        <TableCell align='right'>
                          {project.description}
                        </TableCell>
                        <TableCell align='right'>{project.creator}</TableCell>
                        <TableCell align='right'>{project._id}</TableCell>
                        <Button
                          variant='contained'
                          color='primary'
                          label='Open Project'
                          onClick={() => displayCurrProj(project)}
                        />
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <p>Creator: {currProj.creator}, ID: {currProj.id}</p>
            <div>
              <button onClick={() => updateAmounts(hw1Curr - 1, hw2Curr, hw1Av + 1, hw2Av)}>Return (-1)</button>
              <button onClick={() => updateAmounts(hw1Curr + 1, hw2Curr, hw1Av - 1, hw2Av)}>Check Out (+1) </button>
              <p>HWSet1 Checked Out: {hw1Curr}</p>
            </div>
            <div>
              <button onClick={() => updateAmounts(hw1Curr, hw2Curr - 1, hw1Av, hw2Av + 1)}>Return (-1)</button>
              <button onClick={() => updateAmounts(hw1Curr, hw2Curr + 1, hw1Av, hw2Av - 1)}>Check Out (+1)</button>
              <p>HWSet2 Checked Out: {hw2Curr}</p>
            </div>
            <p>HWSet1 Available: {hw1Av}</p>
            <p>HWSet2 Available: {hw2Av}</p>
            <button>Make Changes</button>
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
