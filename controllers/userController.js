const bcrypt = require('bcrypt');
const User = require('../model/userModel');

exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();
    // throw new Error('Required');
    return res.status(200).json({
        users,
    });
};

exports.updateProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        // console.log(userId);
        const user = await User.findById(userId);
        // console.log(user);
        if (!user) {
            return res.status(401).json({
                message: 'User not found',
            });
        }
        req.body.password = await bcrypt.hash(req.body.password, 11);
        //   console.log(req.body.password);
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        return res.status(201).json({
            message: 'Successfully Updated',
            data: updatedUser,
        });
    } catch (err) {
        return res.status(401).json({
            message: 'Server Error',
            error: err,
        });
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                message: 'User not found',
            });
        }
        const deletedUser = await User.findByIdAndDelete(userId, { new: true });
        return res.status(201).json({
            message: 'User deleted successfully',
            data: deletedUser,
        });
    } catch (err) {
        return res.status(401).json({
            message: 'Server Error',
            error: err,
        });
    }
};
