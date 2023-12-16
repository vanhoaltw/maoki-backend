const AWS = require("aws-sdk");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const stream = require("stream");

AWS.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
});

const s3 = new AWS.S3();

const uploadToS3 = async (
  file,
  { isPrivate, folder = "images/", ...s3Options } = {}
) => {
  const { originalname, buffer } = file;
  const uniqName = uuidv4();
  const pass = new stream.PassThrough();

  const params = {
    Bucket: "maokihouse",
    Key: path.join(folder, uniqName + originalname),
    CacheControl: "max-age=31536000",
    Body: pass,
    ...(!isPrivate ? { ACL: "public-read" } : {}),
    ...s3Options,
  };

  const streamInput = new stream.Readable();
  streamInput.push(buffer);
  streamInput.push(null);
  streamInput.pipe(pass);

  const uploadPromise = s3.upload(params).promise();

  const uploadData = await uploadPromise;

  return uploadData;
};

module.exports = { uploadToS3 };
