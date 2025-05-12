import mongoose from "mongoose";


//export a function that connect to DB
import dotenv from "dotenv";
dotenv.config();

const db = () => {
        
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => console.log("EROOR connecting to DB", err));
};

export default db;
