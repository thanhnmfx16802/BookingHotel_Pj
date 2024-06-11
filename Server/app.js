const cors = require("cors");
const path = require("path");
const express = require("express");
const app = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const userRouters = require("./routers/authRouter");
const mainRouters = require("./routers/mainRouter");
const adminRouters = require("./routers/adminRouter");

app.use(userRouters);
app.use(mainRouters);
app.use("/admin", adminRouters);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    "mongodb+srv://thanhnmfx16802:ZJFSha0loQVYLbP7@minhthanhfx16802.yrvcsj8.mongodb.net/asm02?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
