import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FlowBar from '../common/Flow';
import AppBar from '../common/AppBar';
import Copyright from '../common/Copyright';
// firebase API
import { firebase } from '../../config/firebase';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '85vh'
  },
  ioTPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(4, 2, 2, 2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '20vh'
  },
  firemenPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '60vh'
  },
  fixedHeight: {
    height: 240,
  },
}));


export default function PostAccident() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar name="Post Accident"/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <FlowBar type="5"/>
        {/* TODO - Write your code here! */}
          <Grid container spacing={3}>
            {/* left  - Map */}
            <Grid item xs={12} md={5} lg={6}>
              <Paper className={classes.paper}>
              <p><b> *PLACEHOLDER* </b></p>
                <b> Video / Photos of the accident and mission</b>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} lg={6}>
            {/* right  - mission details */}
            
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                <p><b> *PLACEHOLDER* </b></p>
                <b> Logs of Emergency and actions taken</b>
                </Paper>  
                </Grid>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
