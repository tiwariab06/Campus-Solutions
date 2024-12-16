const express = require("express");
const router = express.Router();
const path = require("path");
const Sell = require("../models/Sell");
const app = express();

app.use(express.urlencoded({ extended: false }));

//get request

router.get("/fc", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "Home.html"));
});

module.exports = router;
