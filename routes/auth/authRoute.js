const authRoute = require('express').Router();
const { signupController, loginController } = require('../../controllers/auth/authController');

authRoute.post('/signup', signupController);
authRoute.post('/login', loginController);
module.exports = authRoute;
