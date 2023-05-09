// const fileUpload = require('express-fileupload');
// ................fileupload using fileuploader..............
exports.fileUploadController = (req, res) => {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

  console.log("req.files >>>", req.files); // eslint-disable-line

    sampleFile = req.files.sampleFile;
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    // ..........forlocal server........
    // uploadPath = "./tmp/" + uniqueSuffix + "-" + sampleFile.name;
    // ...........for cyclic.............
    uploadPath = `/tmp/${uniqueSuffix}-${sampleFile.name}`;

    sampleFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        return res.status(201).json({
            message: 'success',
            url: uploadPath,
        });
    });
};
