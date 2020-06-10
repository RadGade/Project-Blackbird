const express = require("express");
const bodyParser = require("body-parser");
const Gun = require("gun");
const SEA = require("gun/sea");
const cors = require("cors");
var https = require("https");
var http = require("http");
const path = require("path");
var fs = require("fs");
const app = express();
app.use(Gun.serve);
app.use(express.static("client/public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
});
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

http.createServer(app).listen(8000, function () {
  console.log(
    "Example app listening on port 8000! Go to https://localhost:8000/"
  );
});
