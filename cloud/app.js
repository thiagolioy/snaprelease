
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();


Parse.Cloud.define("Logger", function(request, response) {
  console.log(request.params);
  response.success();
});

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

app.get('/download/:id',function(req, res) {
  var query = new Parse.Query(Release);
  query.get(req.params.id).then(function(release) {
      res.render('release/download', {
        release: release
      });
  },
  function() {
    res.send(500, 'Failed finding the specified post to show');
  });

});

app.get('/plist/:id',function(req, res) {
  var query = new Parse.Query(Release);
  query.get(req.params.id).then(function(release) {
      var filePathSsl = release.get("upload_path").replace("http://", "https://s3.amazonaws.com/");
      res.render('release/plist', {
        bundle_id: release.get("bundle_id"),
        bundle_version: "0.1",
        release_url: filePathSsl,
        release_title: "SnapRelease"
      });
  },
  function() {
    res.send(500, 'Failed finding the specified post to show');
  });
});



// Attach the Express app to Cloud Code.
app.listen();
