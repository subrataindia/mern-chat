const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 8000;

// Configure CORS to allow requests from http://localhost:19006
//app.use(cors({ origin: "http://localhost:19006" }));

// Allow requests from all origins
app.use(cors({ origin: "*" }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

app.get("/", (req, res) => {
  const clientIpAddress = req.socket.remoteAddress;
  console.log(`Server is running on IP: ${clientIpAddress}, Port: ${port}`);
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const User = require("./models/user");
const Message = require("./models/message");

// endpoint for registration of the user

app.post("/register", (req, res) => {
  // Destructure request body
  const { name, email, password } = req.body;

  // Find if user already registered
  User.findOne({ email }).then((user) => {
    if (user) {
      res.status(404).json({ message: "User already exists in database!" });
    } else {
      // create a new user object
      const newUser = new User({ name, email, password });

      // save the user to the database
      newUser
        .save()
        .then(() => {
          res.status(200).json({ message: "User registered successfully" });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: `Error registering the user: ${err.message}` });
        });
    }
  });
});

// endpoint for login of user

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are provided
  if (!email || !password) {
    console.log("Email and Password are required");
    return res.status(404).json({ message: "Email and Password are required" });
  }

  // Function to create token for the user
  const createToken = (userId) => {
    // set the token payload
    const payload = {
      userId,
    };

    // Generate the token with a secret key and expiration time
    const token = jwt.sign(payload, "your_secret_key", { expiresIn: "1h" });
    return token;
  };

  // Check for the user in database
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        // User not found
        return res.status(404).json({ message: "User not found" });
      }

      // compare the provided password in the database
      if (user.password != password) {
        return res.status(404).json({ message: "invalid password!" });
      }

      // If everything is fine return a token for user
      const token = createToken(user._id);
      res.status(200).json({ token });
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "Unable to connect to server! Try again later." });
    });
});
