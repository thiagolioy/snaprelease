module.exports = {
  showMaxSizeNotification : function(){
    this.toggleAnimation("#alert-max-size-notification-container",true,"zoomIn","zoomOut");
  },

  showAlertNotification : function(){
    this.toggleAnimation("#alert-notification-container",true,"zoomIn","zoomOut");
  },

  toggleAnimation : function(elId,turnOn,animIn,animOut){
    var aIn = animIn || "bounceInDown";
    var aOut = animOut || "bounceOutUp";

    if(turnOn){
      $(elId).removeClass("hide");
      $(elId).removeClass('animated '+aOut);
      $(elId).addClass('animated '+aIn);
    }else{
      $(elId).removeClass('animated '+aIn);
      $(elId).addClass('animated '+aOut).delay(400).queue(function(next){
        $(this).addClass("hide");
        next();
      });
    }
  },

  updateProgressBar : function(evt){
    var percentComplete = Math.round((evt.loaded / evt.total)* 100);
    var status = "" + percentComplete + "%";
    $("#progressbar-meter").animate({width:status});
  }


};
