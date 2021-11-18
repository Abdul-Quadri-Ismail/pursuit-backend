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
  console.log(req.query);
  //description //Python developer
  if (
    req.query.description === "Javascript developer" ||
    req.query.location === "Germany"
  ) {
    jsonResponse(false, res);
  } else {
    jsonResponse(true, res);
  }
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} at port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
});

const jsonResponse = (search, res) => {
  res.json(
    shuffle(
      JSON.parse(
        fs.readFileSync(
          path.resolve(
            __dirname,
            search ? "_data/feed.json" : "_data/searchFeed.json"
          )
        )
      )
    )
  );
};

function shuffle(sourceArray) {
  for (var i = 0; i < sourceArray.length - 1; i++) {
    var j = i + Math.floor(Math.random() * (sourceArray.length - i));

    var temp = sourceArray[j];
    sourceArray[j] = sourceArray[i];
    sourceArray[i] = temp;
  }
  return sourceArray;
}
