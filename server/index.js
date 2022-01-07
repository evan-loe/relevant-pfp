const express = require("express");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/api/test", (req, res) => {
  const count = 5;

  res.json({ status: "success yay!" });
  console.log("Successful get request");
});

app.post("/api/uploadFile", upload.single("profileImage"), (req, res) => {
  console.log(req.file);

  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");
});

// any request that doesnt match above routes
app.get("*", (req, res) => {
  console.log(path.join(__dirname, "../client/build/index.html"));
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("/home", (req, res) => {
  console.log(path.join(__dirname, "../client/build/index.html"));
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
