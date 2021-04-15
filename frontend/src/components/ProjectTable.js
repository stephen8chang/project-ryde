import React from 'react';
import {
  Button,
  Grid,
  Paper,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));
const ProjectTable = ({ projects, onOpenProject }) => {
  const classes = useStyles();
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
                <TableCell align='center'>{project.description}</TableCell>
                <TableCell align='center'>{project.creator}</TableCell>
                <TableCell align='center'>{project._id}</TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => onOpenProject(project)}
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
  );
};

export default ProjectTable;
