import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  TableCell,
  TableRow,
  TableBody,
  Table,
  TableHead,
  TableContainer,
  Paper,
  TextField,
  MenuItem,
  Input,
  IconButton,
  Collapse
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import CreateProject from '../components/CreateProject';
import CreateHardware from '../components/CreateHardware';
import ProjectTable from '../components/ProjectTable';
import HardwareTable from '../components/HardwareTable';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));
const ProjectsScreen = props => {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [hardwares, setHardwares] = useState([]);
  const [openedProject, setOpenedProject] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openedProjectHardware, setOpenedProjectHardware] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openedMessage, setOpenedMessage] = useState(false);
  //On open of project, for checking in and out hardware sets (dropdown menu)
  const [hardwareDropDown, setHardwareDropDown] = useState('');
  const [hardwareQty, setHardwareQty] = useState('');
  const [addMoreFunds, setAddMoreFunds] = useState('');
  useEffect(() => {
    if (errorMessage !== '') {
      setSuccessMessage('');
    } else if (successMessage !== '') {
      setErrorMessage('');
    }
  }, [errorMessage, successMessage]);
  const resetOnClose = () => {
    setHardwareDropDown('');
    setHardwareQty('');
    setErrorMessage('');
    setSuccessMessage('');
    setOpenModal(false);
    setOpenedMessage(false);
    fetchAllProjects();
    fetchAllHardwares();
  };
  const handleCheckIn = () => {
    let checkedOutElement = '';
    let checkedOutQty = 0;
    let checkedOutEntireElement = null;
    openedProjectHardware.forEach(element => {
      if (element.hardware._id === hardwareDropDown) {
        checkedOutElement = element._id;
        checkedOutEntireElement = element;
        checkedOutQty = element.checkedOut;
      }
    });
    if (checkedOutQty < Number(hardwareQty)) {
      console.log('Project dos not own enough sets.');
      setSuccessMessage('');
      setErrorMessage('Project does not own enough sets.');
    } else if (Number(hardwareQty) < 0) {
      console.log('Please enter a value of at least 1.');
      setSuccessMessage('');
      setErrorMessage('Please enter a value of at least 1.');
    } else {
      setErrorMessage('');
      setSuccessMessage('Successfully updated.');
      axios.post('/api/projects/checkin', {
        hardwareId: hardwareDropDown,
        checkedId: checkedOutElement,
        projectId: openedProject._id,
        qty: Number(hardwareQty),
        fundsPer: checkedOutEntireElement.hardware.fundsPer
      });
    }
    setOpenedMessage(true);
  };
  const handleCheckOut = async () => {
    let checkedOutElement = '';
    let checkedOutEntireElement = null;
    let hardwareQtyAvailable = 0;
    openedProjectHardware.forEach(element => {
      if (element.hardware._id === hardwareDropDown) {
        checkedOutElement = element._id;
        checkedOutEntireElement = element;
        hardwareQtyAvailable = element.hardware.available;
      }
    });
    console.log(hardwareQtyAvailable, hardwareQty);
    if (hardwareQtyAvailable < Number(hardwareQty)) {
      console.log('Not enough hardware sets to check out.');
      setSuccessMessage('');
      setErrorMessage('Not enough hardware sets to check out.');
    } else if (Number(hardwareQty) < 0) {
      console.log('Please enter a value of at least 1.');
      setSuccessMessage('');
      setErrorMessage('Please enter a value of at least 1.');
    } else {
      setErrorMessage('');
      setSuccessMessage('Successfully updated.');

      await axios.post('/api/projects/checkout', {
        hardwareId: hardwareDropDown,
        checkedId: checkedOutElement,
        projectId: openedProject._id,
        qty: Number(hardwareQty),
        fundsPer: checkedOutEntireElement.hardware.fundsPer
      });
    }
    setOpenedMessage(true);
  };
  const handleAddMoreFunds = () => {
    // current value in addMoreFunds
    // current project in openedProject
    if (Number(addMoreFunds) <= 0) {
      setSuccessMessage('');
      setErrorMessage('Please enter a value of at least 1.');
    }
    else {
      setErrorMessage('');
      setSuccessMessage('Successfully updated funds.');
      axios.post('/api/projects/addFunds', {
        funds: addMoreFunds,
        id: openedProject._id
      });
    }
    setAddMoreFunds('');
    setOpenedMessage(true);
    window.location.reload(false);
  }

  const fetchAllProjects = async () => {
    await axios.get('/api/projects/all').then(projects => {
      setProjects(projects.data);
    });
  };
  const fetchAllHardwares = async () => {
    await axios.get('/api/hardware/all').then(hardware => {
      setHardwares(hardware.data);
    });
  };
  const onOpenProject = async project => {
    setHardwareDropDown('');
    setHardwareQty('');
    fetchAllHardwares();
    //Gets all of the current opened project's hardware ids
    const projectHardwareIds = project.checkedOut.map(
      element => element.hardware
    );
    //Gets all of the hardware ids available
    const hardwareIds = hardwares.map(element => element._id);
    let missingHardwareIds = [];
    let removedHardwareIds = [];
    let missingHardwareSets = [];

    //Finds which new hardware sets appeared after creation of project under missingHardwareIds
    hardwareIds.forEach(id => {
      if (!projectHardwareIds.includes(id)) {
        missingHardwareIds.push(id);
      }
    });
    //Finds which hardware sets were deleted after creation of project under removedHardwareIds
    projectHardwareIds.forEach(id => {
      if (!hardwareIds.includes(id)) {
        removedHardwareIds.push(id);
      }
    });
    missingHardwareIds.forEach(id => {
      hardwares.forEach(hardware => {
        if (id === hardware._id) {
          missingHardwareSets.push(hardware);
        }
      });
    });
    console.log(missingHardwareSets);
    if (missingHardwareSets) {
      const checkedOut = await axios.post('/api/checked/create', {
        hardwareSets: missingHardwareSets
      });
      const checkedOutArray = project.checkedOut;
      checkedOut.data.forEach(data => checkedOutArray.push(data));
      await axios.post('/api/projects/addHardware', {
        checkedOut: checkedOutArray,
        id: project._id
      });
    }
    if (removedHardwareIds) {
      const checkedOutArray = project.checkedOut;
      //Remove objects that are inside removedHardwareIds
      removedHardwareIds.forEach(removedId => {
        checkedOutArray.forEach((checked, index) => {
          if (checked.hardware === removedId) {
            checkedOutArray.splice(index, 1);
          }
        });
      });
      await axios.post('/api/projects/addHardware', {
        checkedOut: checkedOutArray,
        id: project._id
      });
    }
    setOpenModal(true);
    setOpenedProject(project);
    let hardwareArray = project.checkedOut.map(async ({ _id }) => {
      let hardware = await axios.get('/api/checked/hardware/' + _id);
      return hardware.data[0];
    });
    await Promise.all(hardwareArray).then(res => setOpenedProjectHardware(res));
  };
  const renderHardwareCheckout = () => {
    return (
      <>
        <div>
          <Paper className={classes.paper}>
            <TableContainer component={Paper}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Set</TableCell>
                    <TableCell align='center'>Quantity</TableCell>
                    <TableCell align='center'>Check In</TableCell>
                    <TableCell align='center'>Check Out</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>
                      <TextField
                        select
                        style={{ width: '100%' }}
                        onChange={e => setHardwareDropDown(e.target.value)}
                      >
                        {openedProjectHardware.map(option => (
                          <MenuItem
                            key={option.hardware._id}
                            value={option.hardware._id}
                          >
                            {option.hardware.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell align='center'>
                      <Input
                        type='number'
                        onChange={e => setHardwareQty(e.target.value)}
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        variant='contained'
                        color='primary'
                        disabled={hardwareDropDown === '' || hardwareQty === ''}
                        onClick={handleCheckIn}
                      >
                        Check In
                      </Button>
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        variant='contained'
                        color='primary'
                        disabled={hardwareDropDown === '' || hardwareQty === ''}
                        onClick={handleCheckOut}
                      >
                        Check Out
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableHead >
                  <TableRow align="center">
                    <TableCell align='center'>
                      <b>Current Funds: {openedProject.funds}</b>
                    </TableCell>
                    <TableCell align='center'>
                      <Input
                        type='number'
                        placeholder='Add More Funds'
                        onChange={e => setAddMoreFunds(e.target.value)}
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={handleAddMoreFunds}
                      >
                        Add to Project
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Paper>
        </div>
        <div style={{ paddingTop: '1rem' }}>
          {errorMessage ? (
            <Collapse in={openedMessage}>
              <Alert
                style={{
                  width: '50%',
                  justifyContent: 'center',
                  margin: 'auto'
                }}
                action={
                  <IconButton
                    aria-label='close'
                    color='inherit'
                    size='small'
                    onClick={() => {
                      setOpenedMessage(false);
                    }}
                  >
                    <CloseIcon fontSize='inherit' />
                  </IconButton>
                }
                severity='error'
              >
                {errorMessage}
              </Alert>
            </Collapse>
          ) : null}
          {successMessage ? (
            <Collapse in={openedMessage}>
              <Alert
                style={{
                  width: '50%',
                  justifyContent: 'center',
                  margin: 'auto'
                }}
                action={
                  <IconButton
                    aria-label='close'
                    color='inherit'
                    size='small'
                    onClick={() => {
                      setOpenedMessage(false);
                    }}
                  >
                    <CloseIcon fontSize='inherit' />
                  </IconButton>
                }
                severity='success'
              >
                {successMessage}
              </Alert>
            </Collapse>
          ) : null}
        </div>
      </>
    );
  };
  const renderHardwareSets = () => {
    let res = [];
    res.push(renderHardwareCheckout());
    openedProjectHardware.forEach(element => {
      res.push(
        <Paper className={classes.paper}>
          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Funds Per Hardware</TableCell>
                  <TableCell align='center'>Available</TableCell>
                  <TableCell align='center'>Checked Out</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'>{element.hardware.name}</TableCell>
                  <TableCell align='center'>{element.hardware.fundsPer}</TableCell>
                  <TableCell align='center'>
                    {element.hardware.available > 10 ? (
                      <Typography style={{ color: 'green' }}>
                        {element.hardware.available}
                      </Typography>
                    ) : (
                      <Typography style={{ color: 'red' }}>
                        {element.hardware.available}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align='center'>{element.checkedOut}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </Paper>
      );
    });
    return res;
  };
  useEffect(async () => {
    fetchAllProjects();
    fetchAllHardwares();
  }, [props.auth]);
  return (
    <Grid container spacing={1}>
      {!props.auth ? <Redirect to='/login' /> : <Redirect to='/projects' />}

      <Grid container item xs={12} spacing={3}>
        <React.Fragment>
          <Grid item xs={4}>
            <CreateProject fetchAllProjects={fetchAllProjects} />
            {props.auth && props.auth.admin && (
              <CreateHardware fetchAllHardwares={fetchAllHardwares} />
            )}
          </Grid>
          <Grid item xs={8}>
            <ProjectTable
              projects={projects}
              onOpenProject={onOpenProject}
              fetchAllProjects={fetchAllProjects}
            />
            {props.auth && props.auth.admin && (
              <HardwareTable
                hardwares={hardwares}
                fetchAllHardwares={fetchAllHardwares}
              />
            )}
          </Grid>
        </React.Fragment>
      </Grid>

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
            <Typography variant='h5' align='center'>
              Project Description
            </Typography>
            <Typography align='center'>{openedProject.description}</Typography>
            <hr />
          </DialogContent>
          <DialogContent>
            <Typography
              variant='h5'
              align='center'
              style={{ paddingTop: '2rem' }}
            >
              Hardware Sets
            </Typography>

            {renderHardwareSets()}
          </DialogContent>
          <DialogActions>
            <Button onClick={resetOnClose} color='primary'>
              Close
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
