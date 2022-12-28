const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const s3Services = require("../../middleware/multer-s3.service")


// @route   POST api/upload
// @desc    Upload file to S3
// @access  Private
router.post("/", auth, s3Services.uploadS3.any(), async (req, res) => {
    try {
        const file = req.files;
        if (!file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }
        res.json({
            file: file
        });
    } catch (err) {
        
        res.status(500).send("Server Error");
    }
});

router.delete("/:fileName", auth, async (req, res) => {
    try {
        const fileName = req.params.fileName;
        const deleted = await s3Services.deleteObject(fileName);
        res.json({ deleted });
    } catch (err) {
        
        res.status(500).send("Unable to delete file");
    }
});

module.exports = router;

// "file": {
//     "fieldname": "file",
//     "originalname": "626311.jpg",
//     "encoding": "7bit",
//     "mimetype": "image/jpeg",
//     "size": 871551,
//     "bucket": "cyber2cyber",
//     "key": "1648022835392_87fdd918.jpg",
//     "acl": "public-read",
//     "contentType": "image/jpeg",
//     "contentDisposition": null,
//     "contentEncoding": null,
//     "storageClass": "STANDARD",
//     "serverSideEncryption": null,
//     "metadata": null,
//     "location": "https://cyber2cyber.s3.amazonaws.com/1648022835392_87fdd918.jpg",
//     "etag": "\"fadc8a73d2a670aafa12a3b62d34f070\""
// }