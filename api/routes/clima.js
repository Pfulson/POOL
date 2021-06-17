const express = require("express");
const weather = require("weather-js");
var info;

const router = express.Router();

router.get("/", (req, res) => {

 //const day = req.params.dia.toString().length
 //const month = req.params.mes.toString().length
 //dia = parseInt(req.params.dia);
 //mes = parseInt(req.params.mes);

 //if(day == 2 && month == 2){
   zodiaco()
   // }else{
     //  res.send("Revise el dia o mes")
    //}

   function zodiaco() {

    weather.find(
      { search: "Republica Dominicana, DO", degreeType: "F" },
      function (err, result) {
        if (err) console.log(err);

        console.log(JSON.stringify(result, null, 2));
        res.status(200).send(JSON.stringify(result[0]));
      }
    ); 

   }
});

module.exports = router;