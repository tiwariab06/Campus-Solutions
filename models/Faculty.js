const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
const auth = require("../controllers/authentication");
const FacultySchema = new Schema(
  {
    UserType: {
      type: String,
      //required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Year: {
      type: String,
      required: true,
    },
    Department: {
      type: String,
      required: true,
    },
    Sections: {
      type: [String], // Changed to array for multi-select support
      required: true,
    },
    Subjects: {
      type: [String], // Changed to array for multi-select support
      required: true,
    },
  },
  { timestamps: true } // Corrected the key
);

// Hash the password before saving
FacultySchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});

// Static method to verify password
FacultySchema.static("matchPassword", async function (Email, Password) {
  const user = await this.findOne({ Email });
  if (!user) throw new Error("User Not Found");

  // Compare the provided password with the stored hash
  const isMatch = await bcrypt.compare(Password, user.Password);
  if (!isMatch) throw new Error("Incorrect password");

  // Generate a token
  const token = auth.createTokenForUser(user);
  return token;
});

const Faculty = model("faculty", FacultySchema);
module.exports = Faculty;
