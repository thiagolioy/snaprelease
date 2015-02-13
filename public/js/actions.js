var keys = require('./keys');
var uiutils = require('./uiutils');
var utils = require('./utils');



module.exports = {

  uploadFile : function(file){
    var serverUrl = 'https://api.parse.com/1/files/' + file.name;

    var dictRef = this;

    $.ajax({
      xhr: function() {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener("progress", function(evt) {
          if (evt.lengthComputable) {
            uiutils.updateProgressBar(evt);
          }
        }, false);
        return xhr;
      },
      type: "POST",
      beforeSend: function(request) {
        request.setRequestHeader("X-Parse-Application-Id", keys.parseAppId);
        request.setRequestHeader("X-Parse-REST-API-Key", keys.parseRestApiKey);
        request.setRequestHeader("Content-Type", file.type);
        uiutils.toggleAnimation("#progressbar-container",true,"zoomIn","zoomOut");
      },
      url: serverUrl,
      data: file,
      processData: false,
      contentType: false,
      success: function(data) {
        uiutils.toggleAnimation("#progressbar-container",false,"zoomIn","zoomOut");
        dictRef.postRelease(data.url);
      },
      error: function(data) {
        var obj = jQuery.parseJSON(data);
        alert(obj.error);
      }
    });

  },

  initParseSdk : function(){
    if(!Parse.applicationId)
      Parse.initialize(keys.parseAppId,
        keys.parseJsApiKey);
  },

  postRelease : function(filePath){
    this.initParseSdk();

    var Release = Parse.Object.extend("Release");
    var newRelease = new Release();

    newRelease.set("upload_path", filePath);
    newRelease.set("bundle_id", "teste.api");

    newRelease.save(null, {
      success: function(release) {
        var releaseUrl = "http://snaprelease.parseapp.com/download/"+release.id;
        window.location.replace(releaseUrl);
      },
      error: function(release, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });

  }


};
