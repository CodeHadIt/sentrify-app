import mongoose from "mongoose";

const DB_URI = process.env.DB_URI as string;

let isConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Connection already established");
    return;
  }
  try {
    await mongoose.connect(DB_URI);
    isConnected = true;
    console.log("Connected to Db successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;