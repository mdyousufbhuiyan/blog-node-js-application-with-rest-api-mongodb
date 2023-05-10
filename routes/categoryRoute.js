const categoryRouter = require('express').Router();
const {
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
} = require('../controllers/categoryController');
const { authCheckingMiddleWare } = require('../middlewares/auth');

categoryRouter.get('/', authCheckingMiddleWare, getAllCategory);
categoryRouter.get('/:categoryId', authCheckingMiddleWare, getCategory);
categoryRouter.post('/', authCheckingMiddleWare, createCategory);
categoryRouter.put('/:categoryId', authCheckingMiddleWare, updateCategory);
categoryRouter.delete('/:categoryId', authCheckingMiddleWare, deleteCategory);
module.exports = categoryRouter;
