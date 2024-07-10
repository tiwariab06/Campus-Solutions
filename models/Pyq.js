const { Schema, model } = require("mongoose");
const express = require("express");
const app = express();
const pyqSchema = new Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    sem: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Pyq = model("pyq", pyqSchema);
module.exports = Pyq;
