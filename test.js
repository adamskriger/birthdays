var s3 = new AWS.S3(),
    buffer = new Buffer(2.5 * 1024 * 1024); // 2.5MB buffer

var params = {vaultName: vaultName, body: buffer};
glacier.uploadArchive(params, function(err, data) {
  if (err) console.log("Error uploading archive!", err);
  else console.log("Archive ID", data.archiveId);
});



var s3 = new AWS.S3();
