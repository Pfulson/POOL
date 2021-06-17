const express = require("express");

const http = require('http')
const fs = require('fs');

const bodyParser = require("body-parser");
const cors = require("cors");

const GEOIP = require("./routes/GeoIP");
const zodiaco = require("./routes/signozodiacal");
const clima = require("./routes/clima");
const translate = require("./routes/translate");
//const rnc = require("./routes/API_RNC");
//const usuarios = require("./routes/usuarios");


///api/cedula/40229108952/K+tC4PcIWZjsJ3wnjy2pGtH4i0Q=

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use("/api/v1/geoip", GEOIP);
app.use("/api/v1/zodiaco", zodiaco);
app.use("/api/v1/clima", clima);
app.use("/api/v1/traducir", translate);
//app.use("/rnc", rnc);
//app.use("/api/sysflexADMIN/auth", usuarios);

  /*  fetch("http://ip-api.com/json/")
      .then((result) => result.json())
      .then((data) => c(data));
*/
app.use(function(req, res) {
  res.status(404).sendFile('public/404/', {root: __dirname})
});


app.listen(3335, function (){
  //console.log(process.env.PORT)
})



module.exports = app;

