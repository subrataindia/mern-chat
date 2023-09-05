const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json);
app.use(passport.initialize());

mongoose
  .connect(
    "mongodb+srv://codingsubrata:subrata@cluster0.sju7ccr.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to Mongo DB!");
  })
  .catch((e) => {
    console.log(`Unable to connect to Mongo DB" ${e.message}`);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
