const express = require("express");
const { Navigator } = require("node-navigator");
const navigator = new Navigator();
var info;
var lat;
var lon;


const router = express.Router(); 

router.get("/", (req, res) => {

  navigator.geolocation.getCurrentPosition((success, error) => {
  if (error) {console.error(error)}
  else {
    lat = success.latitude;
    lon = success.longitude;

  }

  info = { "Latitude": lat, "Longitude": lon };

 // console.log(info, "info");

  return res.status(200).send(JSON.stringify(info));
});


});


module.exports = router;