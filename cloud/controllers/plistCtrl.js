
exports.plist = function(req, res) {
  var Release = Parse.Object.extend('Release');
  var query = new Parse.Query(Release);
  query.get(req.params.id).then(function(release) {
    var filePathSsl = release.get("upload_path").replace("http://", "https://s3.amazonaws.com/");
    res.render('dist/release/plist', {
      bundle_id: release.get("bundle_id"),
      bundle_version: "0.1",
      release_url: filePathSsl,
      release_title: "SnapRelease"
    });
  },
  function() {
    res.send(500, 'Failed finding the specified post to show');
  });
};
