"use strict";
var aws = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");
var path = require("path");
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

function randomString(length) {
    let s = crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
    return s;
}

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});
var s3 = new aws.S3();
var uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        // Set public read permissions
        acl: 'public-read',
        // Auto detect contet type
        contentType: multerS3.AUTO_CONTENT_TYPE,
        // Set key/ filename as original uploaded name
        key: function (req, file, cb) {
            var ext = path.extname(file.originalname);
            var f_name = Date.now() + "_" + randomString(8);
            var file_name = "" + f_name + ext;
            cb(null, file_name)
        }
    })
});

var deleteObject = async (filename) => await s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: filename }).promise();


module.exports = {
    uploadS3,
    deleteObject
};
