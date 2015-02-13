module.exports = {

  isTooBig : function(fileSize){
    var max = 10485760;
    return fileSize > max ? true : false;
  },

  isValidUploadFile : function(name){
    return (name.indexOf(".ipa") == -1 && name.indexOf(".apk") == -1) ? false : true;
  }

};
