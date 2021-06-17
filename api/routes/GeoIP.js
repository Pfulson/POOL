const express = require("express");
const os = require("os");
const publicIp = require("public-ip");
var geoip = require("geoip-lite");
var geo; 
var ip;
var info;


const router = express.Router(); 

router.get("/", (req, res) => {


var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
  for (var k2 in interfaces[k]) {
    var address = interfaces[k][k2];
    if (address.family === "IPv4" && !address.internal) {
      addresses.push(address.address);
    }
  }
}

(async () => {
  ip = await publicIp.v4();
  geo = geoip.lookup(ip);

 
info = {"publicip" : ip,
    "privateip" : addresses, geo}

  
  return res
    .status(200)
    .send(JSON.stringify(info));
})();




});

module.exports = router;