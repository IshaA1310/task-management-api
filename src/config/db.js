import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully", conn.connection.host);
    } catch (err) {
        console.log('Connection is not done', err.message);
        throw err;
    }
}

export default connectDB;
