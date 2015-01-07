
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
require('cloud/app.js');

Parse.Cloud.job("clearReleases", function(request, status) {

  Parse.Cloud.useMasterKey();

  var Release = Parse.Object.extend('Release');

  var query = new Parse.Query(Release);
  query.each(function(release) {
    var d =  release.createdAt;
    var today = new Date();
    var past = d.getDate() < today.getDate();
    if(past){

      release.destroy({
        success: function(r) {
          console.log("Release deleted : " + r.id);
        },
        error: function(r, error) {
          console.log("Error on delete Release : " + error);
        }
      });

    }

  }).then(function() {
    // Set the job's success status
    status.success("Migration completed successfully.");
  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong.");
  });
});
