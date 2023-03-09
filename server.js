const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./src/router/route.js");
const connectDB = require("./src/config/connectDB");
const bodyParser = require("body-parser");

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** application port */
const port = process.env.PORT || 8080;

app.use("/api", router); /**apis */

/** routes */
app.get("/", (req, res) => {
  try {
    res.send("Get request");
  } catch (error) {
    res.json(error);
  }
});

connectDB();

app.listen(port, () => {
  console.log(`Server connected to http://localhost:${port}`);
});
