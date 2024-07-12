const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const connectionString = await mongoose.connect(process.env.mongo_URI);
    console.log(`MongoDB connected: ${connectionString.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit with failure
  }
};

module.exports = {connectDB};




