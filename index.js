const express = require('express');
// express app initialization
const app = express();
const url = require('url');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const morgan = require('morgan');
const multer = require('multer');
const connectDB = require('./config/connectionDB');
const authRoute = require('./routes/auth/authRoute');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));
// support json
app.use(express.json());
// to see the request...........
app.use(morgan('dev'));

// ....routes...............
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/postblog', postRoute);

// upload file........
const uploadStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '/public');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const fileName = `${file.fieldname}-${uniqueSuffix}-${file.originalname}`;
        cb(null, fileName);
        req.body.myFileName = fileName;
    },
    // filename: (req, file, callBack) => {
    //     callBack(null, file.originalname);
    // },
});
const upload = multer({ storage: uploadStorage });
app.post('/api/upload', upload.single('file'), (req, res, next) => {
    const hostname = req.headers.host;
    const { pathname } = url.parse(req.url); // pathname = '/MyApp'
    console.log(`http://${hostname}/public/${req.body.myFileName}`);
    res.status(201).json({
        message: 'File Uploaded Successfully',
        url: `http://${hostname}/public/${req.body.myFileName}`,
    });
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
});
// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}
app.get('/api/myhome', (req, res, next) => res.status(201).json({
        message: 'Success',
        data: 'data',
    }),
);

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
