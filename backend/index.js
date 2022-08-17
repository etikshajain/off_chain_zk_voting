const express = require('express');
const bodyParser=require('body-parser');
var cors = require('cors')
var app = express()
// const Grid = require("gridfs-stream");
const config=require('./config');
// const nodemailer=require("nodemailer");
const mongoose = require('mongoose');
const connection = require("./db");

app.use(cors());
const port = 5000;
app.use(express.json());

//connecting to mongoose server
const connectToMongo = require('./db');
connectToMongo();
app.use(bodyParser.json());
//routes:

app.use('/public',express.static(__dirname + '/public'));
app.use('/api/proposal',require('./routes/proposal'));
// app.use('/api/vote',require('./routes/vote'))


app.listen(port, () => {
  console.log(`App backend server listening at http://localhost:${port}`)
});