
exports.index = function(req, res) {
  res.render('dist/release/index', {
    name: "snaprelease"
  });
};


exports.download = function(req, res) {
  var Release = Parse.Object.extend('Release');
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
        res.render('dist/release/download', {
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
};
