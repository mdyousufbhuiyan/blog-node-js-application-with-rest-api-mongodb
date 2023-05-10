const Category = require('../model/categoryModel');

exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        console.log(name);
        const category = await Category.create({ name });
        return res.status(201).json({
            message: 'Success',
            data: category,
        });
    } catch (err) {
        res.status(404).json({
            message: 'Server Error!!',
            error: err,
        });
    }
};
exports.getAllCategory = async (req, res, next) => {
    try {
        const { name } = req.query;
        let categorys;
        if (name) {
            categorys = await Category.find({ name }).select({ __v: 0 });
        } else {
            categorys = await Category.find().select({ __v: 0 });
        }

        return res.status(201).json({
            message: 'Success',
            data: categorys,
        });
    } catch (err) {
        res.status(404).json({
            message: 'Server Error!!',
            error: err,
        });
    }
};

exports.getCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId).select({ __v: 0 });
        return res.status(201).json({
            message: 'Success',
            data: category,
        });
    } catch (err) {
        res.status(404).json({
            message: 'Server Error!!',
            error: err,
        });
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        console.log(categoryId);
        const cate = Category.findById(categoryId);
        if (!cate) {
            return res.status(401).json({
                message: 'no category found to update',
            });
        }
        const category = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
        return res.status(201).json({
            message: 'Successfully Updated',
            data: category,
        });
    } catch (err) {
        res.status(404).json({
            message: 'Server Error!!',
            error: err,
        });
    }
};
exports.deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        console.log(categoryId);
        const cate = Category.findById(categoryId);
        if (!cate) {
            return res.status(401).json({
                message: 'no category found to update',
            });
        }
        const category = await Category.findByIdAndDelete(categoryId, req.body);
        return res.status(201).json({
            message: 'Successfully Deleted',
        });
    } catch (err) {
        res.status(404).json({
            message: 'Server Error!!',
            error: err,
        });
    }
};
