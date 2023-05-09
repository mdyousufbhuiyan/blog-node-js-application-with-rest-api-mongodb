const { fileUploadController } = require('../controllers/fileUploadController');

const fileUploadRoute = require('express').Router();


fileUploadRoute.post("/",fileUploadController);


module.exports = fileUploadRoute;