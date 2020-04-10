import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';

import { config, firebase } from './config/firebase';

// const rows = [
//   createData(0, '16 Mar, 2019', '16:00:24', '75849603', 'Tupelo, MS', 'Fire'),
//   createData(1, '16 Mar, 2019', '15:56:09', '85937284', 'London, UK', 'Chemical Spill'),
//   createData(2, '16 Mar, 2019', '13:44:59', '19205847', 'Boston, MA', 'Fire'),
//   createData(3, '16 Mar, 2019', '10:20:10', '49503854', 'Gary, IN', 'Medical Emergency'),
//   createData(4, '16 Mar, 2019', '08:46:36', '34845933', 'Long Branch, NJ', 'Medical Emergency'),
// ];

function App() {

  let latitude = 0;
  let longitude = 0;
  let hrate = 0;
  let btemp = 0;
  let pid = 0;
  let task = "";
  let fatigue = "0%";

  const handleClick = () => {
    hrate = document.getElementById("hrate").value;
    btemp = document.getElementById("btemp").value;
    pid = document.getElementById("pid").value;
    task = document.getElementById("task").value;
    fatigue = document.getElementById("fatigue").value;
    getLocation();
  }

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else {
      console.log("location failed")
    }
  }

  function setPosition(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    //reverseGeocoding();
    post();
  }

  function post() {
    const db = firebase.firestore();
    db.collection("firemen_IoT").doc(pid).set({
      timestamp: new Date(),
      lat: latitude,
      lng: longitude,
      temperature: btemp,
      heartrate: hrate,
      fatigue: fatigue,
      task: task
    }).then(function (docRef) {
      console.log("Document written with ID: ");
    }
    );
  }

  return (
    <div className="App">
        <label for="pid">Personnel: </label>
        <select id="pid">
          <option value="FDkK3y183wyUnDkNxVTT">John Terry</option>
          <option value="aWojEljeS5lCH6ilFa5m">Sean Lee</option>
          <option value="eFaAxSrwbf9S3FDBfAh3">Tom Cruise</option>
  =     </select>

        <br></br><br></br>
        <label for="task">Task: </label>
        <select id="task">
          <option value="Water Hose 1">Water Hose 1</option>
          <option value="Water Hose 2">Water Hose 2</option>
          <option value="Enter building">Enter building</option>
  =     </select>

        <br></br><br></br>
        <label for="hrate">Heart rate: </label>
        <input type="text" id="hrate" name="hrate" ></input>

        <br></br><br></br>
        <label for="btemp">Body temperature: </label>
        <input type="text" id="btemp" name="btemp"></input>

        <br></br><br></br>
        <label for="fatigue">Fatigue Level: </label>
        <input type="text" id="fatigue" name="fatigue"></input>
      <br></br>
      <br></br>

      <Button variant="primary" onClick={handleClick}>Send Updates</Button>
    </div>
  );
}

export default App;
