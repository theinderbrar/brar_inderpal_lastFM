const express = require("express");
const app = express();

const userRoutes = require("./routes/user");

const port = process.env.PORT || 5000;

app.use(express.static("public", { extensions: ["html", "css"] }));

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "\\index.html");
});

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
