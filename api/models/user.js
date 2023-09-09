const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // This line specifies that 'email' is a unique index
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  receivedFriendRequests: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sentFriendRequests: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  friends: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Create a unique index on the 'email' field
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
