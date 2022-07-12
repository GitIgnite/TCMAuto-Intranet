"use strict";
const express = require("express");
const compression = require("compression");

// const _port = 4200;
const _app_folder = 'dist/TCMAuto-INTRANET';

const app = express();
const port = process.env.PORT || 8080

// ---- SERVE STATIC FILES ---- //
console.log("server : "+app)
console.log("server.server : "+app.server)

app.get('/', function (req, res) {
  res.redirect('https://' + req.get('host') + req.url);
})
app.use('/', express.static(_app_folder));


app.listen(port, () => { console.log("app is started and listening port : ", process.env.HOST)})
