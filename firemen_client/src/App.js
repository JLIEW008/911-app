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

  const handleClick = () => {
    hrate = document.getElementById("hrate").value;
    btemp = document.getElementById("btemp").value;
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

  // function reverseGeocoding() {
  //   var xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function () {
  //     if (this.readyState == 4 && this.status == 200) {
  //       address = JSON.parse(this.responseText).results[0].formatted_address;
  //       post();
  //     }
  //   }
  //   xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key="+config.apiKey, true);
  //   xhttp.send();
  // }

  function post() {
    const db = firebase.firestore();
    db.collection("firemen_updates").add({
      timestamp: new Date(),
      lat: latitude,
      lng: longitude,
      btemp: btemp,
      hrate: hrate
    }).then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    }
    );
  }

  return (
    <div className="App">
      <form action="/action_page.php">
        <label for="hrate">Heart rate: </label>
        <input type="number" id="hrate" name="hrate" ></input>
        <br></br><br></br>
        <label for="btemp">Body temperature: </label>
        <input type="number" id="btemp" name="btemp"></input>
      </form>
      <br></br>
      <br></br>
      <Button variant="primary" onClick={handleClick}>Send Updates</Button>
    </div>
  );
}

export default App;
