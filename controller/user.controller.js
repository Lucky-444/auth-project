import User from "../models/User.model.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  //get data
  // validate data

  //create a user in data
  //create a verification token
  //send email with verification token
  //save token in DB

  //send response to user
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userCreation = await User.create({ name, email, password });
    if (!userCreation) {
      return res.status(400).json({ message: "User not created" });
    }

    console.log(userCreation);

    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);

    userCreation.verificationToken = token;
    await userCreation.save();

    // send email
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: process.env.MAIL_TRAP_HOST,
      port: process.env.MAIL_TRAP_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_TRAP_HOST_USER,
        pass: process.env.MAIL_TRAP_HOST_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.MAIL_TRAP_SENDER_EMAIL,
      to: userCreation.email,
      subject: "Email Verification",
      html: `<p>Click <a href="http://localhost:3000/api/v1/verify/${token}">here</a> to verify your email</p>`,
      text: `please Click on the Link to verify your email http://localhost:3000/api/v1/verify/${token}`,
    };

    const emailValue = await transport.sendMail(mailOption);
    console.log(emailValue);

    return res.status(201).json({
      message: "User registered successfully, verification email sent",
      success: true,
      data: userCreation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { token } = req.params; // Correct way to get token from path parameter
    console.log(token);

    if (!token) {
      return res.status(400).json({ message: "Token is invalid" });
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "User is not verified",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // const token =  jwt.sign({id : user._id} , process.env.JWT_SECRET_KEY , {expiresIn : "1d"} , (err , token) => {
    //   if(err){
    //     return res.status(400).json({
    //       message : err.message,
    //       success : false ,
    //     })
    //   }
    //   return res.status(200).json({
    //     message : "User logged in successfully",
    //     success : true ,
    //     data : {
    //       token : token,
    //       user : user,
    //     }
    //   })
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    //   expiresIn: "1d",
    // });
    //  ****now here create access token and refresh token ***//

    const accessToken = jwt.sign({id : user._id} , process.env.ACCESS_SECRET_KEY ,{
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
    })

    const refreshToken = jwt.sign({id : user._id} , process.env.REFRESH_SECRET_KEY , {
      expiresIn : process.env.REFRESH_TOKEN_EXPIRY,
    })

    user.refreshToken = refreshToken;

    await user.save();

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    };


    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: {
        refreshToken: refreshToken,
        accessToken : accessToken,
        user: user,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error,
      success: false,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const data = req.user;
    console.log("User Data", data);
    const user = await User.findById(data.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        data: {},
      });
    }

    res.status(201).json({
      message: "User Profile Retrieved Successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: "some Error Occured",
      error: error,
      success: false,
      data: {},
    });
  }
};

const logoutUser = async (req, res) => {
  const token = req.cookies.refreshToken;
  if(!token){
     res.status(401).json({
      message: "Token Invalid",
      error: error,
      success: false,
      data: {},
    });
  }

  try {

    // //check is user logged in or not
    // if(!req.user){
    //   res.status(401).json({
    //   message: "User Not Logged in Yet",
    //   error: error,
    //   success: false,
    //   data: {},
    // });
    // }

    const refreshTokenDecode = jwt.verify(token , process.env.REFRESH_SECRET_KEY);

    const user = await User.findOne({_id : refreshTokenDecode.id});

    if(!user){
      res.status(401).json({
      message: "User is Not Valid",
      error: error,
      success: false,
      data: {},
    });
    }

    //step 2 --> clear the cookie
    user.refreshToken = null;

    res.cookie("refreshToken", " ", {
      expires: new Date(0),
      httpOnly : true,
    });

    res.cookie("accessToken", " ", {
      expires: new Date(0),
      httpOnly : true,
    });

    //send response

    res.status(201).json({
      message: "User logged out Successfully",
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: "some Error Occured",
      error: error,
      success: false,
      data: {},
    });
  }
};


const forgotPassword = async (req, res) => {
  try {
    //get email
    const { email } = req.body;
    if(!email){
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        data: {},
      });
    }

    //reset token  + reset expiry time
    const token = crypto.randomBytes(32).toString("hex");
    console.log(token)
    
    const resetExpiry = Date.now() + 10 * 60 * 1000;//how many mins = 10 mins
    user.resetPasswordToken = token;
    user.resetPasswordTokenExpires = resetExpiry;
    await user.save();

    //now send email
    // send email
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: process.env.MAIL_TRAP_HOST,
      port: process.env.MAIL_TRAP_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_TRAP_HOST_USER,
        pass: process.env.MAIL_TRAP_HOST_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.MAIL_TRAP_SENDER_EMAIL,
      to: user.email,
      subject: "Email Verification",
      html: `<p>Click <a href="http://localhost:3000/api/v1/reset/${token}">here</a> to verify your email</p>`,
      text: `please Click on the Link to verify your email http://localhost:3000/api/v1/reset/${token}`,
    };

    const emailValue = await transport.sendMail(mailOption);
    console.log(emailValue);

    res.status(201).json({
      message: "Password reset token sent to your email",
      success: true,
      data : user
    })

    console.log(token);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: "Error sending password reset token",
      success: false,
    })
  }
};

const resetPassword = async (req, res) => {
  try {
    //collect token from password
    // password from req.body
    const { token } = req.params;
    const { newPassword } = req.body;
    //check token is valid or not
    if(!newPassword){
      return res.status(400).json({
        message: "Please enter new password",
        success: false,
      })        
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).json({
        message: "Invalid token or expired",
        success: false,
        data: {},
      });
    }
    //update password
    user.password = newPassword;
    //resetToken  , and ResetExpiry field
    // save
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error updating password",
      success: false,
      data  : {},
    })
  }
};



export {
  registerUser,
  verifyUser,
  login,
  logoutUser,
  forgotPassword,
  resetPassword,
  getProfile,
};
