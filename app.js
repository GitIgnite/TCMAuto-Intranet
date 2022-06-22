"use strict";
const express = require("express");
const compression = require("compression");

// const _port = 4200;
const _app_folder = 'dist/TCMAuto-INTRANET';

const app = express();
app.use(compression());


// ---- SERVE STATIC FILES ---- //
console.log("app : "+app)
console.log("app.server : "+app.server)
app.server.get('*.*', express.static(_app_folder));

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, {root: _app_folder});
});

// ---- START UP THE NODE SERVER  ----
// app.listen(_port, function () {
//   console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
// });
