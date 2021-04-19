import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Paper,
  Snackbar,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const HardwareTable = ({ hardwares }) => {
  const classes = useStyles();
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleDeleteHardware = id => {
    axios.get('/api/hardware/delete/' + id).then(payload => {
      setSuccessMessage(payload.data.message);
      setSnackbarOpen(true);
    });
  };
  return (
    <Paper className={classes.paper}>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Hardware Name</TableCell>
              <TableCell align='center'>Hardware Available</TableCell>
              <TableCell align='center'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hardwares.map(hardware => (
              <TableRow key={hardware.name}>
                <TableCell component='th' scope='row' align='center'>
                  {hardware.name}
                </TableCell>
                <TableCell align='center'>{hardware.available}</TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    color='secondary'
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteHardware(hardware._id)}
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

export default HardwareTable;
