const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "title can't be empty"],
            unique: true,
        },
        body: {
            type: String,
            required: [true, "body can't be empty"],
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            trim: true,
            required: [true, "userId can't be empty"],
        },
        category: {
            type: Array,
            required: false,
        },
        photo: {
            type: String,
            required: [true, "photo can't be empty"],
        },
    },
    { timestamps: true },
);
uniqueValidator.defaults.type = 'mongoose-unique-validator';
postSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
