const express = require("express");
const router = express.Router();
const path = require("path");
const Sell = require("../models/Sell");
const app = express();

app.use(express.urlencoded({ extended: false }));

//get request

router.get("/sell", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "Sell.html"));
});

//post request for entry in database

router.post("/sell", async (req, res) => {
  const { name, phone, email, subject, type, price } = req.body;
  await Sell.create({
    name,
    phone,
    email,
    subject,
    type,
    price,
  });
  res.redirect("/sell");
});

module.exports = router;
