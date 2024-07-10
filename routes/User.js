const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../models/Users"); //*
const app = express();
app.use(express.urlencoded({ extended: false }));
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "Login.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "Signup.html"));
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPassword(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("Err");
  }
});

// logout route

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});
module.exports = router;
