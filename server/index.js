const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));

const fileuploadRoutes = require("./routes/fileupload.js");
app.use("/api/fileupload", fileuploadRoutes);

app.get("/api/test", (req, res) => {
  const count = 5;

  res.json({ status: "success yay!" });
  console.log("Successful get request");
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

app.get("/privacy", (req, res) => {
  console.log(path.join(__dirname, "../client/build/privacyPolicy.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
