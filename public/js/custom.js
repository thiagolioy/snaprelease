var SnapR = SnapR || (function() {
  var file;

  var bindUploadButtonEvent = function () {
    $('#upload-button').click(function(){
      $('#select-file').click();
    });
  };

  var bindSelectFileEvent = function () {
    $('#select-file').bind("change", function(f) {
      var files = f.target.files || f.dataTransfer.files;
      file = files[0];
      $("#filename").val(file.name);
    });
  };

  var bindSnapReleaseEvent = function(){
    $('#snaprelease-button').click(function() {
      var serverUrl = 'https://api.parse.com/1/files/' + file.name;


      $.ajax({
        xhr: function() {
          var xhr = new window.XMLHttpRequest();
          xhr.upload.addEventListener("progress", function(evt) {
            if (evt.lengthComputable) {
              var percentComplete = Math.round((evt.loaded / evt.total)* 100);
              var status = "" + percentComplete + "%";
              $("#progressbar-meter").animate({width:status});
              //Do something with upload progress here
            }
          }, false);


          return xhr;
        },
        type: "POST",
        beforeSend: function(request) {
          request.setRequestHeader("X-Parse-Application-Id", 'jol9azVpjaanp6btbn3fQVAoQVsE4ZFwUE29EkQh');
          request.setRequestHeader("X-Parse-REST-API-Key", '1l6FZMNAlO2ubHK62Z2p2dbXZso0I7Q4JxreJSBG');
          request.setRequestHeader("Content-Type", file.type);
          $("#progressbar-container").fadeIn();
        },
        url: serverUrl,
        data: file,
        processData: false,
        contentType: false,
        success: function(data) {
          $("#progressbar-container").fadeOut();
        },
        error: function(data) {
          var obj = jQuery.parseJSON(data);
          alert(obj.error);
        }
      });

    });
  };

  var attachEvents = function () {
    bindUploadButtonEvent();
    bindSelectFileEvent();
    bindSnapReleaseEvent();
  };

  return {
    attachEvents : attachEvents
  };
})();

$(document).ready(function() {
  SnapR.attachEvents();
});
