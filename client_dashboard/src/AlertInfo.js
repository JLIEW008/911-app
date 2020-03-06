import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(row, date, time, id, location, type) {
  return { row, date, time, id, location, type };
}

const rows = [
  createData(0, '16 Mar, 2019', '16:00:24', '75849603', 'Tupelo, MS', 'Fire'),
  createData(1, '16 Mar, 2019', '15:56:09', '85937284', 'London, UK', 'Chemical Spill'),
  createData(2, '16 Mar, 2019', '13:44:59', '19205847', 'Boston, MA', 'Fire'),
  createData(3, '16 Mar, 2019', '10:20:10', '49503854', 'Gary, IN', 'Medical Emergency'),
  createData(4, '16 Mar, 2019', '08:46:36', '34845933', 'Long Branch, NJ', 'Medical Emergency'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
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
      const unixTime = new Date().getUnixTime();
      firebase.firestore().collection('alarms')
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
  return (
    <React.Fragment>
      <Title>Current Alerts</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Id</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Emergency Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map(alert => (
            <TableRow key={alert.row}>
              <TableCell>{alert.date}</TableCell>
              <TableCell>{alert.time}</TableCell>
              <TableCell>{alert.id}</TableCell>
              <TableCell>{alert.location}</TableCell>
              <TableCell>{alert.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more Emergencies
        </Link>
      </div>
    </React.Fragment>
  );
}
