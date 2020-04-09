import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import { Link } from 'react-router-dom';

import {
  Typography, Grid, CardMedia,
  CardContent, Card
} from '@material-ui/core';

import firebase from '../config/firebase';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(1),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[2],
    // marginBottom: theme.spacing(4),
    // marginTop: theme.spacing(4),
  },
  cardMedia: {
    paddingTop: '100%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none"
},
}));

export default function IoTInfo() {
  const classes = useStyles();

  const [alerts, setAlerts] = useState(null);
  const [firemenInfo, setFiremenInfo] = useState(null);
  // Initialize with listening to our
  // messages collection. The second argument
  // with the empty array makes sure the
  // function only executes once
  useEffect(() => {
    listenForAlerts();
    listenForFiremenInfo();
  }, []);


  // Use firestore to listen for changes within
  // our newly created collection
  const listenForAlerts = () => {
    firebase.firestore().collection('mission_alerts')
      .onSnapshot((snapshot) => {
        // Loop through the snapshot and collect
        // the necessary info we need. Then push
        // it into our array
        const allAlerts = [];
        snapshot.forEach((doc) => allAlerts.push(doc.data()));

        // Set the collected array as our state
        setAlerts(allAlerts);
      }, (error) => console.error(error));
  };

  const listenForFiremenInfo = () => {
    firebase.firestore().collection('firemen')
      .onSnapshot((snapshot) => {
        // Loop through the snapshot and collect
        // the necessary info we need. Then push
        // it into our array
        const allFiremen = [];
        snapshot.forEach((doc) => allFiremen.push(doc.data()));

        // Set the collected array as our state
        setFiremenInfo(allFiremen);
      }, (error) => console.error(error));
  };

  if (!alerts) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  if (!firemenInfo) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  return (
    <React.Fragment>
      <Title>Mission Team</Title>
      <Grid container spacing={4}>
        {firemenInfo.map(({ name, image, id, rank, role }, index) => (
          <Grid item key={index} xs={12} sm={12} md={6}>
            <Link to={'/' + id} className={classes.link}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={image}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h3">
                  <b>{name}</b>
                </Typography>
                <Typography>
                  Rank:
                  <span>&nbsp;</span>
                  {rank}
                </Typography>
                <Typography>
                  Role:
                  <span>&nbsp;</span>
                  {role}
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
