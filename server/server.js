var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var poolModule = require('./modules/pool.js');
var pool = poolModule;


// Serve back static files
app.use(bodyParser.json());
app.use(express.static('./server/public'));

app.get('/server', function(req, res){
  console.log('Hit the server!');
});

app.post('/saveFavorite', function(req, res) {
  var gif = req.body;
  console.log('post recieved data', gif);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'INSERT INTO "favoritegif" ("imageurl") VALUES ($1);';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [gif.imageUrl], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.sendStatus(201);
        }
      }); // end query
    } // end if
  }) // end pool
});

app.get('/getFavorites', function(req, res) {
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'SELECT * FROM "favoritegif";';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.send({gifs: result.rows});
        }
      }); // end query
    } // end if
  }) // end pool
});

app.delete('/deleteFavorite', function(req, res) {
  var gif = req.query;
  console.log('delete recieved data', gif);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'DELETE FROM "favoritegif" WHERE "imageurl"=$1;';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [gif.url], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.sendStatus(201);
        }
      }); // end query
    } // end if
  }) // end pool
});

// Handle index file separately
app.post('/saveFavorite', function(req, res){
  console.log('received post request');
});

app.get('/', function(req, res) {
  console.log('Hit the server!');
  res.sendFile(path.resolve('./server/public/views/index.html'));
});




app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
