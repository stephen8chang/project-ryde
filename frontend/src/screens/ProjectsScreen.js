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
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import CreateProject from '../components/CreateProject';
import CreateHardware from '../components/CreateHardware';
import ProjectTable from '../components/ProjectTable';
import HardwareTable from '../components/HardwareTable';

const ProjectsScreen = props => {
  const [projects, setProjects] = useState([]);
  const [hardwares, setHardwares] = useState([]);
  const [openedProject, setOpenedProject] = useState({});
  const [openedProjectCheckedOut, setOpenedProjectCheckedOut] = useState([]);
  const [openedProjectHardware, setOpenedProjectHardware] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState('');
  const [successSnackbar, setSuccessSnackbar] = useState('');
  const onOpenProject = project => {
    setOpenModal(true);
    setOpenedProject(project);
    setOpenedProjectCheckedOut(project.checkedOut);
    let hardwareArray = project.checkedOut.map(async checkOutId => {
      const hwObject = await axios.get('/api/checked/hardware/' + checkOutId);
      return hwObject.data[0];
    });
    Promise.all(hardwareArray).then(res => setOpenedProjectHardware(res));
  };
  const renderHardwareSets = () => {
    let res = [];
    console.log(props.auth);
    console.log(openedProjectHardware);
    openedProjectHardware.forEach(element => {
      res.push(
        <>
          <Typography align='center'>{element.hardware.name}</Typography>
          <Typography align='center'>
            Checked out: {element.checkedOut}
          </Typography>
        </>
      );
    });
    return res;
  };
  useEffect(async () => {
    await axios.get('/api/projects/all').then(projects => {
      setProjects(projects.data);
    });
    await axios.get('/api/hardware/all').then(hardware => {
      console.log(hardware.data);
      setHardwares(hardware.data);
    });
  }, [props.auth, projects]);
  return (
    <Grid container spacing={1}>
      {!props.auth ? <Redirect to='/login' /> : <Redirect to='/projects' />}

      <Grid container item xs={12} spacing={3}>
        <React.Fragment>
          <Grid item xs={4}>
            <CreateProject />
            {props.auth && props.auth.admin && <CreateHardware />}
          </Grid>
          <Grid item xs={8}>
            <ProjectTable projects={projects} onOpenProject={onOpenProject} />
            {props.auth && props.auth.admin && (
              <HardwareTable hardwares={hardwares} />
            )}
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
              {openedProject.projectName} - {openedProject.creator}
            </Typography>
          </AppBar>
          <DialogContent>
            <Typography align='center'>{openedProject.description}</Typography>
          </DialogContent>
          <DialogContent>{renderHardwareSets()}</DialogContent>
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
