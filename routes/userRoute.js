const userRoute = require('express').Router();
const { getAllUsers, updateProfile,deleteUser } = require('../controllers/userController');
const { authCheckingMiddleWare } = require('../middlewares/auth');

userRoute.get('/', authCheckingMiddleWare, getAllUsers);
userRoute.put('/:userId', authCheckingMiddleWare, updateProfile);
userRoute.delete('/:userId', authCheckingMiddleWare, deleteUser);
module.exports = userRoute;
