import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
  button: {
    margin: theme.spacing(2), 
  },
}));

export default function Assets() {
  const classes = useStyles();

  const [assets, setAssets] = useState(null);
  // Initialize with listening to our
    // messages collection. The second argument
    // with the empty array makes sure the
    // function only executes once
    useEffect(() => {
      listenForAssets();
  }, []);


  // Use firestore to listen for changes within
  // our newly created collection
  const listenForAssets = () => {
      firebase.firestore().collection('firefighting_assets')
          .onSnapshot((snapshot) => {
              // Loop through the snapshot and collect
              // the necessary info we need. Then push
              // it into our array
              const allAssets = [];
              snapshot.forEach((doc) => allAssets.push(doc.data()));
              
              // Set the collected array as our state
              setAssets(allAssets);
          }, (error) => console.error(error));
  };

  if (!assets) {
    return (
        <div>
            Loading...
      </div>
    )
  }
  return (
    <React.Fragment>
      <Title>Firestation Assets</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align='center'>Name</TableCell>
            <TableCell align='center'>Max. selection</TableCell>
            <TableCell padding="textfield">Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map(asset => (
            <TableRow>
              <TableCell align="center">{asset.name}</TableCell>
              <TableCell align="center">{asset.val}</TableCell>
              <TableCell padding="checkbox">
                <TextField type="number" defaultValue={0} InputProps={{ inputProps: { min: 0, max: asset.val } }}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="default" className={classes.button}>
        Confirm
      </Button>
    </React.Fragment>
  );
}
