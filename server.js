const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//const multer = require("multer");
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyparser = require("body-parser");
const db = require("./config/db");
const serverless = require("serverless-http");
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limits: { fileSize: 1000000, files: 1 } }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 1000000 }));

// const auth = require("./src/route/auth")
// const subcriptions = require("./src/route/subcriptions")
// const staff = require("./src/route/staff")
// const department = require("./src/route/department")


require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 2005;

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Working App" });
});

app.use("/api/v1/", require("./routes/indexRoutes"));

db();
require('./controllers/invoiceCronJob')
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = {
  handler: serverless(app),
};