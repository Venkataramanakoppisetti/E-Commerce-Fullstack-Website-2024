const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwtToken = require("jsonwebtoken");
const db = require('./database')
const app = express();

const PORT = 10000;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})