const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "name can't be empty"],
        },
        userName: {
            type: String,
            trim: true,
            required: [true, "username can't be empty"],
            unique: true,
        },

        email: {
            type: String,
            trim: true,
            required: [true, "email can't be empty"],
            unique: true,
        },

        password: {
            type: String,
            trim: true,
            required: [true, "password can't be empty"],
        },

        profile: {
            type: String,
            trim: true,
            required: true,
            default: 'avater.png',
        },
    },
    {
        timestamps: true,
    }
);
uniqueValidator.defaults.type = 'mongoose-unique-validator';
userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
