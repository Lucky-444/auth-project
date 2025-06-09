import mongoose from "mongoose";
import bcrypt from 'bcryptjs';



const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpires: {
    type: Date,
  },
  refreshToken : String,
  
} , {
        timestamps : true
});

UserSchema.pre("save", async function (next) { // pre hook for password  
  // ye hook run krega Pre save ke baad
  // this ke pass access hoga current document or context hoga
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("User", UserSchema);
