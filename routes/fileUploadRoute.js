const fileUploadRoute = require('express').Router();
const { fileUploadController } = require('../controllers/fileUploadController');

fileUploadRoute.post('/', fileUploadController);
module.exports = fileUploadRoute;
