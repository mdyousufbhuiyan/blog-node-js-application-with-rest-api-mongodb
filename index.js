const express = require('express');
// express app initialization
const app = express();
const url = require('url');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const multer = require('multer');
const connectDB = require('./config/connectionDB');
const authRoute = require('./routes/auth/authRoute');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const fileUploadRoute = require('./routes/fileUploadRoute');
const categoryRouter = require('./routes/categoryRoute');

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(fileUpload());
app.use('/tmp/', express.static('tmp'));
// support json
app.use(express.json());
// to see the request...........
app.use(morgan('dev'));

function errorHandler(err, req, res, next) {
    console.log(`through error.........${err}`);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}
// ....routes...............
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/postblog', postRoute);
app.use('/api/category', categoryRouter);
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }));
app.use('/api/upload', fileUploadRoute);
// default options

// upload file........
// const uploadStorage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './tmp');
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//         const fileName = `${file.fieldname}-${uniqueSuffix}-${file.originalname}`;
//         cb(null, fileName);
//         req.body.myFileName = fileName;
//     },
//     // filename: (req, file, callBack) => {
//     //     callBack(null, file.originalname);
//     // },
// });

// app.post('/api/upload', function(req, res) {
//     let sampleFile;
//     let uploadPath;

//     if (!req.files || Object.keys(req.files).length === 0) {
//       res.status(400).send('No files were uploaded.');
//       return;
//     }

//     console.log('req.files >>>', req.files); // eslint-disable-line

//     sampleFile = req.files.sampleFile;
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     uploadPath = __dirname+'/tmp/' +uniqueSuffix+"-"+ sampleFile.name;

//     sampleFile.mv(uploadPath, function(err) {
//       if (err) {
//         return res.status(500).send(err);
//       }

//      return res.status(201).json({
//         message:"success",
//        url: uploadPath});
//     });
//   }
//   );
//  const upload = multer({ storage: uploadStorage });
// app.post('/api/upload', upload.single('file'), (req, res, next) => {
//     const hostname = req.headers.host;
//     const { pathname } = url.parse(req.url); // pathname = '/MyApp'
//     console.log(`http://${hostname}/tmp/${req.body.myFileName}`);
//     res.status(201).json({
//         message: 'File Uploaded Successfully',
//         url: `http://${hostname}/tmp/${req.body.myFileName}`,
//     });
//     // req.files is array of `photos` files
//     // req.body will contain the text fields, if there were any
// });
// default error handler

app.get('/api/myhome', (req, res, next) => res.status(201).json({
        message: 'Success',
        data: 'data',
    }),
);
app.use(errorHandler);
const port = process.env.PORT || 4000;
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running at ${port}/`);
        // connectDB();
    });
});
// app.listen(port, () => {
//     console.log(`server is running at ${port}/`);
//    // connectDB();
// });
