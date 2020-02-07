// load Express.js
const express = require('express') 
const app = express()

// load bodyParser module for json payload parsing
const bodyParser = require('body-parser') 
const port = 3000;

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

// connect to MongoDB client 
const MongoClient = require('mongodb').MongoClient;

// This will help connect to the mongodb client using the port 27017 
MongoClient.connect('mongodb://localhost:27017/afterschool', { useNewUrlParser: true, useUnifiedTopology: true  }, (error, client) => {
    if (error)
    {
        return console.log('Unable to Connect To MongoDb Server');
    }
    console.log('Connected to MonogoDb');
    db = client.db('afterschool');
});

// This will enable a user to enter their details to a DATABASE
// I have split this into different catigories includeing: Name, Email, Password & User type.
app.post('/addUser', (req,res) => {
    db.collection('users').insertOne({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        user_type: req.body.user_type
      },(err,result) => {
        if (err)
        {
          res.status(501).send(err)
        } else {
            res.send(result.ops);
        }
      });
});
//This allows you to add the course to the database
app.post('/addNewCourse', (req,res) => {
    db.collection('course').insertOne({
        topic: req.body.topic,
        price: req.body.price,
        location: req.body.location,
        provider: req.body.provider,
        course_review: req.body.course_review,
        review_ranking: req.body.review_ranking,
        author: req.body.author
      },(err,result) => {
        if (err)
        {
          res.status(501).send(err)
        } else {
            res.send(result.ops);
        }
      });
});

// This function will call all the users from the database
app.get('/getAllUsers', (req,res) => {

    db.collection('users').find({}).toArray().then((docs) => {

        res.send((JSON.stringify(docs, undefined, 2)));

      }, (err) => {
        if (err)
        {
          return console.log('Unable to fetch users', err);
        }
      });
});
// This function will call all the courses from the database
app.get('/getAllCourses', (req,res) => {

    db.collection('course').find({}).toArray().then((docs) => {

        res.send((JSON.stringify(docs, undefined, 2)));

      }, (err) => {
        if (err)
        {
          return console.log('Unable to fetch courses', err);
        }
      });
});
        app.listen(3000)