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
postRoute.get('/:postId', authCheckingMiddleWare, getPost);
postRoute.post('/', authCheckingMiddleWare, createPost);
postRoute.put('/:postId', authCheckingMiddleWare, updatePost);
postRoute.patch('/:postId', authCheckingMiddleWare, updateAnyField);
postRoute.delete('/:postId', authCheckingMiddleWare, deletePost);

module.exports = postRoute;
