import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Title from './Title';

import firebase from '../config/firebase';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(1),
  },
}));

export default function IoTInfo() {
  const classes = useStyles();

  const [alerts, setAlerts] = useState(null);
  // Initialize with listening to our
    // messages collection. The second argument
    // with the empty array makes sure the
    // function only executes once
    useEffect(() => {
      listenForAlerts();
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

  if (!alerts) {
    return (
        <div>
            Loading...
      </div>
    )
}
  return (
    <React.Fragment>
      <Title>Mission Alerts</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell align="center">Progress</TableCell>
            <TableCell align="center">Mission Time</TableCell>
            <TableCell align="center">Temperature</TableCell>
            <TableCell align="center">Crew</TableCell>
            <TableCell align="center">Vehicles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map(alert => (
            <TableRow key={alert.id}>
              <TableCell align="center">{alert.progress}</TableCell>
              <TableCell align="center">{alert.time}</TableCell>
              <TableCell align="center">{alert.temperature}</TableCell>
              <TableCell align="center">{alert.crew}</TableCell>
              <TableCell align="center">{alert.vehicle}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
