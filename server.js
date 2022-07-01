"use strict";
const express = require("express");
const compression = require("compression");

// const _port = 4200;
const _app_folder = 'dist/TCMAuto-INTRANET';

const app = express();

const port = process.env.PORT || 8081

// ---- SERVE STATIC FILES ---- //
console.log("server : "+app)
console.log("server.server : "+app.server)

app.use('/', express.static('dist/TCMAuto-INTRANET'));

app.listen(port, () => { console.log("app is started and listening port : ", port)})
// ---- START UP THE NODE SERVER  ----
// server.listen(_port, function () {
//   console.log("Node Express server for " + server.name + " listening on http://localhost:" + _port);
// });
