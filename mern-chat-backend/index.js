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

// endpoint to access all the users except the user who's currently logged in
app.get("/users/:userId", (req, res) => {
  const loggedInUser = req.params.userId;

  User.find({ _id: { $ne: loggedInUser } })
    .then((users) => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retriving users" });
    });
});

// endpoint to send a request to a particular friend
app.post("/friend-request", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;
  console.log("Will send friend request", currentUserId, selectedUserId);
  try {
    // update the receipient's friend request array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { receivedFriendRequests: currentUserId },
    });
    console.log(
      "updated the receipient's friend request array ",
      selectedUserId
    );

    // update the sender's friend request array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentFriendRequests: selectedUserId },
    });

    console.log("updated the sender's friend request array ", currentUserId);

    res.sendStatus(200);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

// endpoint to accept friend request
app.post("/friend-request/accept", async (req, res) => {
  const { senderId, receiverId } = req.body;
  console.log("senderId: ", senderId, "receiverId: ", receiverId);
  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    console.log(sender, receiver);

    sender.friends.push(receiverId);
    receiver.friends.push(senderId);

    sender.sentFriendRequests = sender.sentFriendRequests.filter(
      (senderSingleId) => senderSingleId.toString() !== senderId.toString()
    );

    receiver.receivedFriendRequests = receiver.receivedFriendRequests.filter(
      (receiverSingleId) =>
        receiverSingleId.toString() !== receiverId.toString()
    );

    await sender.save();
    await receiver.save();
    console.log("Friend Request Successfully Accepted");
    res.status(200).json({ message: "Successfully accepted." });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});
