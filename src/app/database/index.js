import mongoose from 'mongoose';

const connectDB = async () => {
    const connectionUrl = '';
    mongoose
    .connect(connectionUrl)
    .then(() => console.log('Database Connection is Successfull'))
    .catch(error => console.log(error))
};

export default connectDB;
