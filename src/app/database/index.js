import mongoose from 'mongoose';

const connectDB = async () => {
    const connectionUrl = 'mongodb+srv://omarjaforchy:CfWN2W5mNjwsKttu@cluster0.21hcnfr.mongodb.net/nextBlog';
    mongoose
    .connect(connectionUrl)
    .then(() => console.log('Database Connection is Successfull'))
    .catch(error => console.log(error))
};

export default connectDB;