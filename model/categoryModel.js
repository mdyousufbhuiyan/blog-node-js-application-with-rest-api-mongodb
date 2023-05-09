const mongoose = require('mongoose');

const category = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
    },
    { timestamps: true },
);

const Category = mongoose.model('Category', category);
module.exports = Category;
