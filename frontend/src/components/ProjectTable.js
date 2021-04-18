import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Paper,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  Snackbar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));
const ProjectTable = ({ projects, onOpenProject, auth, fetchAllProjects }) => {
  const classes = useStyles();
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleDeleteProject = id => {
    axios.get('/api/projects/delete/' + id).then(payload => {
      setSuccessMessage(payload.data.message);
      setSnackbarOpen(true);
    });
    fetchAllProjects();
  };
  const handleButtonDisable = ({ creator }) => {
    if (auth && auth.admin) {
      return false;
    } else if (creator === auth.email) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <Paper className={classes.paper}>
      <Typography variant='h4'>Projects</Typography>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Project Name</TableCell>
              <TableCell align='center'>Project Description</TableCell>
              <TableCell align='center'>Creator</TableCell>
              <TableCell align='center'>Link</TableCell>
              <TableCell align='center'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map(project => (
              <TableRow key={project.projectName}>
                <TableCell component='th' scope='row' align='center'>
                  {project.projectName}
                </TableCell>
                <TableCell align='center'>{project.description}</TableCell>
                <TableCell align='center'>{project.creator}</TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => onOpenProject(project)}
                  >
                    Open
                  </Button>
                </TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    color='secondary'
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    disabled={handleButtonDisable(project)}
                    onClick={() => handleDeleteProject(project._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={successMessage}
        action={
          <React.Fragment>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={() => setSnackbarOpen(false)}
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
export default connect(mapStateToProps)(ProjectTable);
