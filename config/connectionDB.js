const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database connection success');
    } catch (error) {
        console.log(`Database connection failed ${error}`);
    }
};
module.exports = connectDB;
