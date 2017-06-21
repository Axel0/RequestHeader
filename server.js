// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/whoami", function(req, res){
  let parsedData=whoami(req);
  res.status(200).json(parsedData);
});

function whoami(req){
  return {
    ipaddress:getIp(req.headers['x-forwarded-for'] || req.connection.remoteAddress),
     language: getLanguage(req.headers["accept-language"]),
      software: getOS(req.headers["user-agent"])
  }
}

function getIp(Ip){
   let isV6 = Ip.indexOf(':') >= 0;
      return isV6 ? Ip.split(':').reverse()[0] : Ip;

}

function getLanguage(lang){
 return lang.split(",")[0];
}

function getOS(OS){
   var secondPart=OS.split("/")[1].split("(")[1].split(")")[0];
  return secondPart;
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
