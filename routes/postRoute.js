const postRoute = require('express').Router();
const {
    createPost,
    getAllPost,
    updatePost,
    deletePost,
    updateAnyField,
    getPost,
} = require('../controllers/postController');
const { authCheckingMiddleWare } = require('../middlewares/auth');

postRoute.get('/', authCheckingMiddleWare, getAllPost);
postRoute.get('/:userId', authCheckingMiddleWare, getPost);
postRoute.post('/', authCheckingMiddleWare, createPost);
postRoute.put('/:userId', authCheckingMiddleWare, updatePost);
postRoute.patch('/:userId', authCheckingMiddleWare, updateAnyField);
postRoute.delete('/:userId', authCheckingMiddleWare, deletePost);

module.exports = postRoute;
