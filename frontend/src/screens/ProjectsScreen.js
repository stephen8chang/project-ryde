import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent
} from '@material-ui/core';
import axios from 'axios';
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
  const [openModal, setOpenModal] = useState(false);
  const [openedProjectHardware, setOpenedProjectHardware] = useState([]);

  const onOpenProject = async project => {
    await axios.get('/api/hardware/all').then(hardware => {
      setHardwares(hardware.data);
    });
    const projectHardwareIds = project.checkedOut.map(
      element => element.hardware
    );
    const hardwareIds = hardwares.map(element => element._id);
    let missingIds = [];
    let missingHardwareSets = [];

    hardwareIds.forEach(id => {
      if (!projectHardwareIds.includes(id)) {
        missingIds.push(id);
      }
    });
    missingIds.forEach(id => {
      hardwares.forEach(hardware => {
        if (id === hardware._id) {
          missingHardwareSets.push(hardware);
        }
      });
    });

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
    setOpenModal(true);
    setOpenedProject(project);
    let hardwareArray = project.checkedOut.map(async ({ _id }) => {
      let hardware = await axios.get('/api/checked/hardware/' + _id);
      return hardware.data[0];
    });
    await Promise.all(hardwareArray).then(res => setOpenedProjectHardware(res));
  };
  const renderHardwareSets = () => {
    let res = [];
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
      setHardwares(hardware.data);
    });
  }, [props.auth]);
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
