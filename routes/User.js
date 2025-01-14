const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../models/Users"); //*
const app = express();
app.use(express.urlencoded({ extended: false }));
router.get("/studentlogin", (req, res) => {
  res.render("studentlogin", {
    user: req.body,
  });
});

router.get("/studentsignup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "Signup.html"));
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password, year, section, branch } = req.body;

  await User.create({
    fullName,
    email,
    password,
    year,
    section,
    branch,
  });
  console.log("Signup SucessFull You Can Login Now");
  return res.redirect("/");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPassword(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("Err", {
      user: req.body,
    });
  }
});

// logout route

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});
module.exports = router;
