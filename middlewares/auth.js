const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

exports.authCheckingMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(404).json({ message: 'Access not allow' });
            return;
        }
        const sToken = token.split(' ')[1];
        const decode = await jwt.verify(sToken, process.env.PRIVATE_KEY);
        const { id } = decode;
        const user = await User.findById(id);
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            message: 'Session expired!',
        });
    }
};
