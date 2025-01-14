const express = require("express");
const router = express.Router();
const User = require("../models/Faculty"); // Faculty model

// Render Login Page
router.get("/facultylogin", (req, res) => {
  res.render("FacultyLogin");
});

// Render Signup Page
router.get("/facultysignup", (req, res) => {
  res.render("FacultySignup");
});

// Signup Route
router.post("/facultysignup", async (req, res) => {
  const { Name, Email, Password, Year, Department, Sections, Subjects } =
    req.body;

  try {
    // Validate input
    if (
      !Name ||
      !Email ||
      !Password ||
      !Year ||
      !Department ||
      !Sections ||
      !Subjects
    ) {
      return res.status(400).send("All fields are required.");
    }

    // Create new Faculty User
    await User.create({
      UserType: "Faculty",
      Name,
      Email,
      Password,
      Year,
      Department,
      Sections: Array.isArray(Sections) ? Sections : Sections.split(","), // Support both array and comma-separated strings
      Subjects: Array.isArray(Subjects) ? Subjects : Subjects.split(","),
    });

    console.log("Signup successful");
    res.render("FacultyLogin", {
      message: "Signup successful! Please log in.",
    });
  } catch (error) {
    console.error("Signup error:", error.message);

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).send("Email already in use. Please use another.");
    }

    res.status(500).send("Signup failed. Please try again.");
  }
});

// Login Route
router.post("/facultylogin", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const token = await User.matchPassword(Email, Password); // Match credentials
    res.cookie("token", token).redirect("/fc"); // Set cookie and redirect
  } catch (error) {
    console.error("Login error:", error.message);
    console.log(req.body);
    res.render("Err", {
      user: req.body,
      message: "Invalid credentials. Please try again.",
    });
  }
});

// Logout Route
router.get("/facultylogout", (req, res) => {
  res.clearCookie("token").redirect("/"); // Clear token and redirect
});

module.exports = router;
