const express = require("express");
var info;
var signo;
const router = express.Router();

router.get("/:dia/:mes", (req, res) => {

 const day = req.params.dia.toString().length
 const month = req.params.mes.toString().length
 dia = parseInt(req.params.dia);
 mes = parseInt(req.params.mes);
 if(day == 2 && month == 2){
   zodiaco(dia, mes)
    }else{
       res.send("Revise el dia o mes")
    }
  


   function zodiaco(dia, mes) {

     
    
     if ((dia >= 21 && mes == 3) || (dia <= 20 && mes == 4)){ signo ="Aries"}
     else if ((dia >= 24 && mes == 9) || (dia <= 23 && mes == 10)) {signo ="Libra"}
     else if ((dia >= 21 && mes == 4) || (dia <= 21 && mes == 5)) {
       signo = "Tauro";
     } else if ((dia >= 24 && mes == 10) || (dia <= 22 && mes == 11)) {
       signo = "Escorpio";
     } else if ((dia >= 22 && mes == 5) || (dia <= 21 && mes == 6)) {
       signo = "G\u00E9minis";
     } else if ((dia >= 23 && mes == 11) || (dia <= 21 && mes == 12)) {
       signo = "Sagitario";
     } else if ((dia >= 21 && mes == 6) || (dia <= 23 && mes == 7)) {
       signo = "C\u00E1ncer";
     } else if ((dia >= 22 && mes == 12) || (dia <= 20 && mes == 1)) {
       signo = "Capricornio";
     } else if ((dia >= 24 && mes == 7) || (dia <= 23 && mes == 8)) {
       signo = "Leo";
     } else if ((dia >= 21 && mes == 1) || (dia <= 19 && mes == 2)) {
       signo = "Acuario";
     } else if ((dia >= 24 && mes == 8) || (dia <= 23 && mes == 9)) {
       signo = "Virgo";
     } else if ((dia >= 20 && mes == 2) || (dia <= 20 && mes == 3)) {
       signo = "Piscis";
     }
   }
   info = {"signo": signo}
res.status(200).send(JSON.stringify(info));
});

module.exports = router;