import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  TableRow,
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableHead
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const got = require('got');
const cheerio = require('cheerio');

const extractLinks = async (url) => {
  try {
    // Fetching HTML
    const response = await got(url);
    const html = response.body;

    // Using cheerio to extract <a> tags
    const $ = cheerio.load(html);

    const linkObjects = $('a');
    // this is a mass object, not an array

    // Collect the "href" and "title" of each link and add them to an array
    const links = [];
    linkObjects.each((index, element) => {
      links.push({
        text: $(element).text(), // get the text
        href: $(element).attr('href'), // get the href attribute
      });
    });

    console.log(links);
    // do something else here with these links, such as writing to a file or saving them to your database
  } catch (error) {
    console.log(error.response.body);
  }
};

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const DatasetScreen = props => {
  const classes = useStyles();
  const URL = 'http://books.toscrape.com/';
  extractLinks(URL);
  return (
    <div>
      <Paper className={classes.paper}>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Dataset</TableCell>
                <TableCell align='center'>Authors</TableCell>
                <TableCell align='center'>Description</TableCell>
                <TableCell align='center'>Download Link</TableCell>
              </TableRow>
            </TableHead>
            <TableRow>
              <TableCell align='center'>
                Abdominal and Direct Fetal ECG Database
              </TableCell>
              <TableCell align='center'>Jezewski, Matonia</TableCell>
              <TableCell align='center'>
                The configuration of the abdominal electrodes comprised four
                electrodes placed around the navel, a reference electrode placed
                above the pubic symphysis and a common mode reference electrode
                (with active-ground signal) placed on the left leg. To reduce
                the skin impedance, the areas under the Ag-AgCl electrodes were
                abraded. In all cases, the scalp electrode was placed for a
                clinical indication and all women consented to participate in
                this study.
              </TableCell>
              <TableCell align='center'>
                <Link to='/data1.zip' target='_blank' download>
                  data1.zip
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>
                AF Termination Challenge Database{' '}
              </TableCell>
              <TableCell align='center'>George Moody</TableCell>
              <TableCell align='center'>
                This database of two-channel ECG recordings has been created for
                use in the Computers in Cardiology Challenge 2004, an open
                competition with the goal of developing automated methods for
                predicting spontaneous termination of atrial fibrillation (AF).
                See the challenge announcement for information about the
                competition.
              </TableCell>
              <TableCell align='center'>
                <Link to='/data2.zip' target='_blank' download>
                  data2.zip
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>
                AHA Database Sample Excluded Record
              </TableCell>
              <TableCell align='center'>Goldberger, Amaral</TableCell>
              <TableCell align='center'>
                The American Heart Association (AHA), with funding from the
                National Heart, Lung, and Blood Institute (NHLBI), sponsored the
                development of the AHA Database for Evaluation of Ventricular
                Arrhythmia Detectors during the late 1970s and early 1980s at
                Washington University (St. Louis). The first portions of the AHA
                Database were released in 1982, and it was completed in 1985. No
                revisions or updates were made subsequently, although ECRI has
                distributed the database in several different formats.
              </TableCell>
              <TableCell align='center'>
                <Link to='/data3.zip' target='_blank' download>
                  data3.zip
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>
                ANSI/AAMI EC13 Test Waveforms
              </TableCell>
              <TableCell align='center'>Goldberger, Amaral</TableCell>
              <TableCell align='center'>
                The files in this set can be used for testing a variety of
                devices that monitor the electrocardiogram. The recordings
                include both synthetic and real waveforms. For details on these
                test waveforms and how to use them, please refer to section
                5.1.2.1, paragraphs (e) and (g) in the reference below.
              </TableCell>
              <TableCell align='center'>
                <Link to='/data4.zip' target='_blank' download>
                  data4.zip
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>
                Blood Pressure in Salt-Sensitive Dahl Rats
              </TableCell>
              <TableCell align='center'>Bugenhagen, Cowley</TableCell>
              <TableCell align='center'>
                Salt-sensitive hypertension is known to be associated with
                dysfunction of the baroreflex control system in the Dahl
                salt-sensitive (SS) rat. However, neither the physiological
                mechanisms nor the genomic regions underlying the baroreflex
                dysfunction seen in this rat model are definitively known. Here,
                we have adopted a mathematical modeling approach to investigate
                the physiological and genetic origins of baroreflex dysfunction
                in the Dahl SS rat.
              </TableCell>
              <TableCell align='center'>
                <Link to='/data5.zip' target='_blank' download>
                  data5.zip
                </Link>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(DatasetScreen);
