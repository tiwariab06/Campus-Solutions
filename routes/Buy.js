const express = require("express");
const router = express.Router();
const path = require("path");
const Sell = require("../models/Sell");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

router.get("/getdata", async (req, res) => {
  const data = await Sell.find({});
  if (data.length == 0) {
    res.send({ msg: "There is Nothing to Buy for Now " });
  }
  res.render("Buy", {
    Notes: data,
  });
});
module.exports = router;
