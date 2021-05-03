import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Carousel from "../components/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));


export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h1" align="center" color="textPrimary" gutterBottom>
              Project Ryde
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              A cutting edge Hardware as a Service (HaaS) that allows the user to create projects, check out
              hardware sets for their projects and provides a source of datasets.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    <a 
                        style={{ textDecoration: 'none', color: 'white' }}
                        href='/login' > 
                        Login 
                    </a>
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    <a 
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        href='/register' > 
                        Register 
                    </a>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <div align='center'> 
            <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
              The Team
            </Typography>
            <Carousel />
        </div>
      </main>
    </React.Fragment>
  );
}