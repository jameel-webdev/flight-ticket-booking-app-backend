import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const connectingDb = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDb Connected on ${connectingDb.connection.host}`);
  } catch (err) {
    console.log(`Error : ${err.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
