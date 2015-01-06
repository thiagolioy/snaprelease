
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();



// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.

var Release = Parse.Object.extend('Release');

app.get('/',function(req, res) {
  res.render('release/index', {
    name: "snaprelease"
  });
});

app.get('/download',function(req, res) {
  res.render('release/download', {
    name: "snaprelease"
  });
});

app.get('/plist',function(req, res) {
  var query = new Parse.Query(Release);
  query.descending('createdAt');
  query.limit = 10;

  query.find().then(function(releases) {
    res.render('release/plist', {
      bundle_id: "com.teste",
      bundle_version: "0.0.1",
      release_title: "title",
      release_url: "http://www.google.com"
    });
  },
  function() {
    res.send(500, 'Failed loading places');
  });
});



// Attach the Express app to Cloud Code.
app.listen();
