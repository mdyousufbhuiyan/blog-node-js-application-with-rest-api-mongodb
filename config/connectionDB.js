const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.MONGODB_URL);
        await mongoose.connect(
            'mongodb+srv://mdyousuf336:RUGTU0XzjKUxSGPX@cluster0.ozjnzdn.mongodb.net/blogRestApi?retryWrites=true&w=majority',
        );
        console.log('Database connection success');
    } catch (error) {
        console.log(`Database connection failed ${error}`);
    }
};
module.exports = connectDB;
