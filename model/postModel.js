const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    body: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        trim: true,
        default: "admin",
    },
    category: {
        type: Array,
        required: false,
    },
    photo: {
        type: String,
        required: true,
    }
},{timestamps: true});

const Post  = mongoose.model("Post", postSchema);

module.exports = Post;