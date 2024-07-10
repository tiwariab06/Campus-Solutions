const express = require("express");
const router = express.Router();
const path = require("path");
const Pyq = require("../models/Pyq");
const multer = require("multer");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

router.get("/PyqFiles", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "Upload.html"));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/admin/upload",
  upload.single("fileUrl"),
  async function (req, res) {
    const { title, year, sem } = req.body;
    const fileUrl = req.file.path;
    await Pyq.create({
      title: title,
      year,
      sem,
      fileUrl: fileUrl,
    });
    res.redirect("/PyqFiles");
  }
);

// Route for getting the data and displaying

router.get("/Pyq", async (req, res) => {
  const response = await Pyq.find({});
  if (response.length === 0) {
    res.send({ msg: "No Pyq's available" });
  } else {
    res.render("Pyq", { Pyq: response });
  }
});

// Download file

router.get("/download/:id", async (req, res) => {
  const pyqId = req.params.id;
  try {
    const pyq = await Pyq.findById(pyqId);
    if (!pyq) {
      return res.status(404).send("File not found");
    }
    res.download(pyq.fileUrl);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
