const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const mainRouter = require("./routers/mainRouter");

const app = express();

app.use(bodyParser.json({ limit: "2mb" }));


// CORS
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ERROR Middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

// Application Routes
app.use(mainRouter);

const URI = process.env.URI;

mongoose
  .connect(URI)
  .then(() => app.listen(8081))
  .catch((err) => console.log(err));
