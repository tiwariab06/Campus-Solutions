const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
const auth = require("../controllers/authentication");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

// hash the paasword before saving this is done using the pre

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  //generate salt
  const salt = await bcrypt.genSalt(10);
  const password = user.password;
  const hash = await bcrypt.hash(password, salt);
  this.salt = salt;
  this.password = hash;
  next();
});

// it is a virtual function study the documentation
userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  console.log(user);
  if (!user) throw new Error("User Not Found");

  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvidedHash = await bcrypt.hash(password, salt);
  if (hashedPassword !== userProvidedHash) {
    throw new Error("Incorrect password");
  }
  const token = auth.createTokenForUser(user);
  return token;
});

const User = model("user", userSchema);
module.exports = User;
