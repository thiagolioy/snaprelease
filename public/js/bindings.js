var actions = require('./actions');
var uiutils = require('./uiutils');
var utils = require('./utils');
var _ = require('underscore');

var file;

module.exports = {

  bindUploadButtonEvent : function () {
    $('#upload-button').click(function(){
      $('#select-file').click();
    });
  },

  bindCloseAlertEvent : function () {
    $('.close-alert-action').click(function(){
      uiutils.toggleAnimation("#alert-notification-container",false,"zoomIn","zoomOut");
      uiutils.toggleAnimation("#alert-max-size-notification-container",false,"zoomIn","zoomOut");
    });
  },

  bindSelectFileEvent : function () {
    $('#select-file').bind("change", function(f) {
      var files = f.target.files || f.dataTransfer.files;
      file = files[0];
      if(utils.isTooBig(file.size)){
        uiutils.showMaxSizeNotification();
        return;
      }

      if(utils.isValidUploadFile(file.name)){
        $("#filename").val(file.name);
        var contains = file.name.indexOf(".ipa") > -1;
        uiutils.toggleAnimation("#bundle-id-container",contains);
      }else{
        uiutils.showAlertNotification();
      }

    });
  },

  bindSnapReleaseEvent : function(){
    $('#snaprelease-button').click(function() {
      actions.uploadFile(file);
    });
  },

  attachEvents : function () {
    _.each(this, function(f,k){
      if(k.indexOf("bind") > -1)
      f();
    });
  }
};
