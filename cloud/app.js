
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
      var filePath = release.get("upload_path");

      var isIos = filePath.indexOf(".ipa") > -1;

      var downloadUrl = "http://snaprelease.parseapp.com/download/" + release.id;
      var bitlyApiKey = "26315f2dfa5c559d170c6b278e3a4087d189b687";
      var itunesUrl = "itms-services://?action=download-manifest&url=https://snaprelease.parseapp.com/plist/"+release.id;

      Parse.Cloud.httpRequest({
        url: 'https://api-ssl.bitly.com/v3/shorten',
        params: {
          access_token : bitlyApiKey,
          longUrl : downloadUrl
        },
        success: function(httpResponse) {
          var bitlyUrl = httpResponse.data.data.url;
          res.render('release/download', {
            bitlyUrl: bitlyUrl,
            downloadUrl: (isIos ? itunesUrl : filePath)
          });
        },
        error: function(httpResponse) {
          console.error('Request failed with response code ' + httpResponse.status);
        }
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
