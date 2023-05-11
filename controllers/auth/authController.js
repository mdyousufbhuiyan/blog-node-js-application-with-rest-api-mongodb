const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../model/userModel');

exports.signupController = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 11);
        const {
 name, userName, email, password, profile 
} = req.body;
        const user = await User.create({
            name,
            userName,
            email,
            password,
            profile,
        });
        return res.status(200).json({
            message: `Hello ${name} your account has been created`,
            data: user,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'something went wrong!',
            error: err,
        });
    }
};
exports.loginController = async (req, res, next) => {
    try {
        const { userName, password } = req.query;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({
                message: 'Wrong Credentials',
            });
        }
        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
            return res.status(404).json({
                message: 'Wrong password!',
            });
        }
        const token = await jwt.sign({ userName, _id: user._id }, process.env.PRIVATE_KEY, {
            expiresIn: '2h',
        });
        return res.status(201).json({
            message: 'Success',
            data: user,
            token,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Wrong credentials!',
            error: err,
        });
    }
};
