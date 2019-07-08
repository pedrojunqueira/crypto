//jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {

  var crypto = req.body.crypto;

  var fiat = req.body.fiat;

  var url = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';

  var fullurl = url + crypto + fiat;

  request(fullurl, function(err, response, body) {

  var data = JSON.parse(body);
  var price = data.last;

  res.send('<h1> the last price of ' +crypto+ ' in ' +fiat+ ' is '+price);

  });
    //console.log(JSON.parse(body).last);

});

app.listen(process.env.PORT || 3000, function() {

  console.log('Server is running');

});
