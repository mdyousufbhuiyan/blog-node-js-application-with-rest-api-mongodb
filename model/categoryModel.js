const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const category = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "name field can't be empty!"],
            unique: [true, "name field can't be duplicate!"],
        },
    },
    { timestamps: true },
);
uniqueValidator.defaults.type = 'mongoose-unique-validator';
category.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
const Category = mongoose.model('Category', category);
module.exports = Category;
