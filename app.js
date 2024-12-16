const env = require("dotenv").config();
const express = require("express");
const path = require("path");
const userRoute = require("./routes/User");
const pyqRoute = require("./routes/Pyq");
const mongoose = require("mongoose");
const sellRoute = require("./routes/Sell");
const buyRoute = require("./routes/Buy");
const facultyRoute = require("./routes/FacultyLogin");
const fcloggedinRoute = require("./routes/fclogged");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./midllewares/auth");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

mongoose
  .connect("mongodb://localhost:27017/")
  .then((e) => console.log("MongoDB connected"));

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT} `);
});

app.get("/", (req, res) => {
  res.render("Home", {
    user: req.user,
  });
});

app.use("/user", userRoute);
app.use("/", pyqRoute);
app.use("/", sellRoute);
app.use("/buy", buyRoute);
app.use("/faculty", facultyRoute);
app.use("/", fcloggedinRoute);
