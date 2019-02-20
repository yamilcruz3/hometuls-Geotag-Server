import express from 'express';
import db from './db/db';

// Set up the express app
const app = express();
const uuidv1 = require('uuid/v1');

console.log(uuidv1());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



// get all todos
app.get('/api/v1/todos', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: db
  })
});

app.get('/recordController/getAllRecords', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Records retrieve',
    records: db
  })
});

app.post('/recordController/createRecord', (req, res) => {
//  console.log(req.body);

 if(!req.body.latitude) {
    return res.status(400).send({
      success: 'false',
      message: 'Latitude is required'
    });
  } else if(!req.body.longitude) {
    return res.status(400).send({
      success: 'false',
      message: 'Longitude is required'
    });
  }
 const record = {
   id: uuidv1(),
   categoryA: "F",
   categoryB: "F5",
   comments: null,
   politicA: null,
   politicB: null,
   anonymus:false,
   name: req.body.name,
   email: req.body.email,
   code_state: null,
   code_city: null,
   gender:"M",
   ipAddress: null,
   ipInfo: null,
   date: null,
   image: null,
   staName:"Antioquia",
   citName: null,
   citId: null,
   latitude: req.body.latitude,
   longitude: req.body.longitude,
   countItems: "0"
 }
console.log(record);
 db.push(record);
 return res.status(201).send({
   record
 })
});

const PORT = 4200;
const HOST = '0.0.0.0';
app.listen(PORT,HOST, () => {
  console.log(`server running on port ${PORT}`)
});
