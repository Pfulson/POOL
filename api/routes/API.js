const express = require("express");
const sql = require("mssql");
const os = require("os")
const publicIp = require("public-ip");
const fs = require("fs");
var geoip = require("geoip-lite");
var ip;
var geolator;
var filenameIP;
const dir = "../../logs/";




const config = require("../connect/config");

const router = express.Router(); 

router.get("/:id/:key", (req, res) => {
  sql.connect(config, function (err) {

console.log(err)

   
  //COMPROBANDO TIPO CEDULA/RNC
    const nId = req.params.id.toString().length
    if(nId > 4){

//SET LOGS
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

      console.log(addresses);
      (async () => {
        ip = await publicIp.v4();
        var geo = geoip.lookup(ip);
        filenameIP = ip + geo.city 
       // console.log("ip", ip);
        console.log(geo);

        var stream = fs.createWriteStream(filenameIP+".txt");
        stream.once("open", function (fd) {
          stream.write("Local IPs : " + addresses+"\n");
          stream.write("Public IPs : "+ip+"\n");
          stream.write("DATOS GEOLOGICOS : "+JSON.stringify(geo));
          stream.end();
        });
      })();


    sqlRequest(req.params.id, req.params.key);
    }else{
      res.send("<h2>El mínimo de caracteres aceptados es 5</h2>")
    }

  });

  
  
  const sqlRequest = (id, key) => {
    let request = new sql.Request();
 request.query(`SELECT * FROM APIKeysUsers WHERE APIkey ='${key}'`,
   
 function (err, data) {
   
   //COMPROBANDO EXISTENCIA DE APIKEY
    if(JSON.stringify(data.rowsAffected) != "[1]") {
      return res.send(
        "API key Invalido, Comuniquese con Systems Flex SRL al correo soporte@sysflex.com"
      );
    }
    //COMPROBANDO CONSULTAS DISPONIBLES
       var ReqConsum = data.recordset[0].Requests.trim();
       ReqConsum = parseInt(ReqConsum);
    if(ReqConsum == 0){
       return res.send(
         "Ha agotado todas sus consultas, Comuniquese con Systems Flex SRL al correo soporte@sysflex.com"
       );
    }
    //REALIZANDO LA CONSULTA DE CEDULA 
     if (JSON.stringify(data.rowsAffected) == "[1]" && ReqConsum > 0 ) {
       ReqConsum = ReqConsum - 1;
       
       request.query(
         `SELECT * FROM Ciudadanos WHERE Cedula LIKE '${id}%'`,
         function (err, data) {
          if(JSON.stringify(data.rowsAffected) != "[0]"){
           return res
           .status(200)
           .send(JSON.stringify(data.recordset));

          }else{

        request.query(
        `SELECT * FROM RncTxt WHERE Rnc LIKE '${id}%'`,
        function (err, data) {
          return res
          .status(200)
          .send(JSON.stringify(data.recordset));
        });
         }
        }
         
       );
      
       request.query(
         `UPDATE APIKeysUsers Set Requests ='${ReqConsum}' WHERE APIkey ='${key}'`,
         function (err, data) {
           //res.status(200).send(JSON.stringify(data.recordset));
         }
       );
     }

   
    });
  };
});

router.get("/str/:id/:key", (req, res) => {
  sql.connect(config, function (err) {

  //COMPROBANDO LENGTH
    const nId = req.params.id.toString().length
    if(nId > 4){
    sqlRequest(req.params.id, req.params.key, 3);
    }else{
      res.send("<h2>El mínimo de caracteres aceptados es 5</h2>")
    }

  });

  
  const sqlRequest = (id, key, type) => {

    let request = new sql.Request();
 request.query(`SELECT * FROM APIKeysUsers WHERE APIkey ='${key}'`,
   
 function (err, data) {
   
   //COMPROBANDO EXISTENCIA DE APIKEY
    if(JSON.stringify(data.rowsAffected) != "[1]") {
      return res.send(
        "API key Invalido, Comuniquese con Systems Flex SRL al correo soporte@sysflex.com"
      );
    }
    //COMPROBANDO CONSULTAS DISPONIBLES
       var ReqConsum = data.recordset[0].Requests.trim();
       ReqConsum = parseInt(ReqConsum);
    if(ReqConsum == 0){
       return res.send(
         "Ha agotado todas sus consultas, Comuniquese con Systems Flex SRL al correo soporte@sysflex.com"
       );
    }
    //REALIZANDO LA CONSULTA POR NOMBRE 
     if (JSON.stringify(data.rowsAffected) == "[1]" && ReqConsum > 0 && type == 3) {
       ReqConsum = ReqConsum - 1;
       
       request.query(
         `SELECT * FROM Ciudadanos WHERE Nombres LIKE '${id}%'`,
         function (err, data) {
           return res.status(200).send(JSON.stringify(data.recordset));
         }
       );
       request.query(
         `UPDATE APIKeysUsers Set Requests ='${ReqConsum}' WHERE APIkey ='${key}'`,
         function (err, data) {
           //res.status(200).send(JSON.stringify(data.recordset));
         }
       );
     }


    });
  };
});






//por nombres y apellido1 y apellido 2
router.get("/name/:nombres/:last1/:last2", (req, res) => {
  sql.connect(config, function (err) {
    //COMPROBANDO LENGTH
    const nId = req.params.nombres.toString().length;
    if (nId > 2) {
      sqlRequest(req.params.nombres, req.params.last1, req.params.last2);
    } else {
      res.send("<h2>El mínimo de caracteres aceptados es 3</h2>");
    }
  });

  const sqlRequest = (nombres, last1, last2) => {
    let request = new sql.Request();
    request.query(
      `SELECT * FROM Ciudadanos WHERE Nombres LIKE '${nombres}%' AND Apellido1 LIKE '${last1}%' AND Apellido2 LIKE '${last2}%'`,
      function (err, data) {
        //REALIZANDO LA CONSULTA POR NOMBRE
        return res.status(200).send(JSON.stringify(data.recordset));
      }
    );
      }
});



module.exports = router;
