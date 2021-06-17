const express = require("express");
const translate = require("translate");
var info;

const router = express.Router();

router.get("/", (req, res) => {

 //const word = req.params.word.toString()
 //const month = req.params.mes.toString().length
 //dia = parseInt(req.params.dia);
 //mes = parseInt(req.params.mes);

 //if(day == 2 && month == 2){
   traducir()
   // }else{
     //  res.send("Revise el dia o mes")
    //}

   async function traducir() {

    //translate("Hello world", { to: "en", engine: "google", key: "YOUR-KEY-HERE" })
  const res = await fetch("https://libretranslate.de/translate", {
	method: "POST",
	body: JSON.stringify({
		q: "ondas",
		source: "en",
		target: "es"
	}),
	headers: { "Content-Type": "application/json" }
});
       

         console.log(await res.json());
         res.send(await res.json());
}
});

module.exports = router;