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
  let type = "";
  let address = "";

  const handleClick = () => {
    type = document.getElementById("type").value;
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
    reverseGeocoding();
  }

  function reverseGeocoding() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        address = JSON.parse(this.responseText).results[0].formatted_address;
        post();
      }
    }
    xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key="+config.apiKey, true);
    xhttp.send();
  }

  function post() {
    const db = firebase.firestore();
    db.collection("iot_updates").add({
      timestamp: new Date(),
      location: "Cal Memorial Stadium, Berkeley, CA",
      type: type,
      lat: latitude,
      lng: longitude,
      location: address
    }).then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    }
    );
  }

  return (
    <div className="App">
      <label for="type">Emergency Type: </label>
      <select id="type">
        <option value="Fire">Fire</option>
        <option value="Chemical Spill">Chemical Spill</option>
        <option value="Accident">Accident</option>
=      </select>
      <br></br>
      <br></br>
      <Button variant="primary" onClick={handleClick}>Alert</Button>
    </div>
  );
}

export default App;
