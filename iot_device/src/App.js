import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';

import firebase from './config/firebase';

// const rows = [
//   createData(0, '16 Mar, 2019', '16:00:24', '75849603', 'Tupelo, MS', 'Fire'),
//   createData(1, '16 Mar, 2019', '15:56:09', '85937284', 'London, UK', 'Chemical Spill'),
//   createData(2, '16 Mar, 2019', '13:44:59', '19205847', 'Boston, MA', 'Fire'),
//   createData(3, '16 Mar, 2019', '10:20:10', '49503854', 'Gary, IN', 'Medical Emergency'),
//   createData(4, '16 Mar, 2019', '08:46:36', '34845933', 'Long Branch, NJ', 'Medical Emergency'),
// ];

function App() {
  const handleClick = () => {
    const db = firebase.firestore();
    db.collection("alarms").add({
      row: 3,
      date: "6 Mar, 2020",
      time: "15:00:00",
      id: "53244324",
      location: "Cal Memorial Stadium, Berkeley, CA",
      type: "Fire"
    }).then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    }
    );
  }
  return (
    <div className="App">
      <Button variant="primary" onClick={handleClick}>Alert</Button>
    </div>
  );
}

export default App;
