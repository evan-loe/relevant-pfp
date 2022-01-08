const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/", upload.single("profileImage"), (req, res) => {
  console.log(req.file);

  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");
  ctx.fillText("rel·e·vant 2022");

  res.status(200).json("success yay!");
});

module.exports = router;
