const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/passwords", (req, res) => {
  const count = 5;

  const passwords = Array.from(Array(count).keys()).map(
    (i) => "meowmeowsupersecurepassword"
  );

  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// any request that doesnt match above routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});