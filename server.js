const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json(
    JSON.parse(fs.readFileSync(path.resolve(__dirname, "_data/feed.json")))
  );
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} at port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
});
