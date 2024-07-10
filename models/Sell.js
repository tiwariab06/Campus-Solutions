const { Schema, model } = require("mongoose");
const express = require("express");
const app = express();

const sellSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);
const Sell = model("sell", sellSchema);
module.exports = Sell;
