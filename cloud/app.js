
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();


Parse.Cloud.define("Logger", function(request, response) {
  console.log(request.params);
  response.success();
});


// Controller code in separate files.
var releaseCtrl = require('cloud/controllers/releaseCtrl.js');
var plistCtrl = require('cloud/controllers/plistCtrl.js');

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

//Routes
app.get('/',releaseCtrl.index);
app.get('/download/:id',releaseCtrl.download);
app.get('/plist/:id',plistCtrl.plist);



// Attach the Express app to Cloud Code.
app.listen();
