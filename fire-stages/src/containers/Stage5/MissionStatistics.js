import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Title from '../common/Title';

import { firebase, config } from '../../config/firebase';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(1),
  },
  buttonLink: {
    textDecoration: 'none',
  },
}));

export default function MissionStats() {
  const classes = useStyles();

  const [missionStats, setMissionStats] = useState(null);
  
  const [firefightingAssets, setFirefightingAssets] = useState(null);
  // Initialize with listening to our
    // messages collection. The second argument
    // with the empty array makes sure the
    // function only executes once
  useEffect(() => {
      listenForMissionStats();
      getFirefightingAssets();
  }, []);


  // Use firestore to listen for changes within
  // our newly created collection
  const listenForMissionStats = () => {
      firebase.firestore().collection('mission_stats')
          .onSnapshot((snapshot) => {
              // Loop through the snapshot and collect
              // the necessary info we need. Then push
              // it into our array
              const allMissionStats = [];
              snapshot.forEach((doc) => allMissionStats.push(doc.data()));
              
              // Set the collected array as our state
              setMissionStats(allMissionStats);
          }, (error) => console.error(error));
  };
  
  //var unsubscribe = firebase.firestore().collection('firefighting_assets').onSnapshot((snapshot) => {
  //  const firefightingAssets = [];
  //  snapshot.forEach((doc) => firefightingAssets.push(doc.data()));
  //  setFirefightingAssets(firefightingAssets);
  //});
  
  const getFirefightingAssets = () => {
    firebase.firestore().collection('assets_used').where(firebase.firestore.FieldPath.documentId(), "==", "berkeley_fire").get().then((snapshot) => {
      const firefightingAssets = [];
      snapshot.forEach((doc) => firefightingAssets.push(doc.data()));
      setFirefightingAssets(firefightingAssets);
    });
  }
 
  console.log(firefightingAssets);
  if (!missionStats || !firefightingAssets) {
    return (
        <div>
            Loading...
      </div>
    )
  }
  return (
    <React.Fragment>
      <Title>Fire Overview</Title>
      <Table size="small">
        <TableBody>
          {missionStats.map(stat => (
            <TableRow>
              <TableCell scope="row">{stat}</TableCell>
              <TableCell align='center'>{stat.val}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
