"use strict";
const express = require("express");

const _app_folder = 'dist/TCMAuto-INTRANET';

const app = express();
const port = process.env.PORT || 8080

// ---- SERVE STATIC FILES ---- //
console.log("server : "+app)
console.log("server.server : "+app.server)


// On lance le serveur grace au build (dossier dist/TCMAuto-INTRANET)
app.use('/', express.static(_app_folder));

app.listen(port, () => { console.log("app is started and listening port : ", port)})
