import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const IsLoggedIn = async (req, res, next) => {
  try {
    // console.log(req.cookies);
    // let token = req.cookies?.token;

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    // check aceesstoken --> yes --> direct loginn and create new refresh and accessToken

    //if no then check refresh Token --> new refresh or access Token give him
    // dono nhi hai --> user se bolo pehle login kare

    if (!accessToken) {
      if (!refreshToken) {
        return res.status(401).json({
          message: "Unauthorized. AccessToken and RefreshToken not found.",
          success: false,
          data: {},
        });
      }

      ///refreshToken hai
      const refreshVerified = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
      console.log(refreshVerified.id);

      const user = await User.findOne({ _id: refreshVerified.id });
      console.log(user.email);

      if (!user) {
        return res.status(401).json({
          message: "User is Invalid",
          success: false,
          data: {},
        });
      }

      //agar nhi hai toh sab kuch new banado
      const newAccessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_SECRET_KEY,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );

      const newRefreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_SECRET_KEY,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
      );

      user.refreshToken = newRefreshToken;
      await user.save();

      const cookieOptions = {
        // expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
      };

      res.cookie("accessToken", newAccessToken, cookieOptions);
      res.cookie("refreshToken", newRefreshToken, cookieOptions);
      req.user = refreshVerified;

      next();
    } else {
      const accessTokenVerify = jwt.verify(
        accessToken,
        process.env.ACCESS_SECRET_KEY
      );

      const user = await User.findOne({ _id: accessTokenVerify.id });

      if (!user) {
        return res.status(401).json({
          message: "User has No accessToken",
          success: false,
          data: {},
        });
      }

      const newAccessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_SECRET_KEY,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );

      const newRefreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_SECRET_KEY,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
      );

      user.refreshToken = newRefreshToken;
      await user.save();

      const cookieOptions = {
        // expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
      };

      res.cookie("accessToken", accessToken, cookieOptions);
      res.cookie("refreshToken", refreshToken, cookieOptions);

      req.user = accessTokenVerify;

      next();
    }

    // console.log("Token FOund", token ? "yes" : "no");

    // if (!token) {
    //   return res.status(401).json({
    //     message: "Unauthorized. Token not found.",
    //     success: false,
    //     data: {},
    //   });
    // }

    // const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decode);
    // if(!decode){
    //    return res.status(401).json({
    //     status : false,
    //     message : "Unauthorized Access",

    //    })
    // }

    // req.user = decode;
  } catch (error) {
    console.log("Failure in Auth Middleware", error);
    res.status(401).json({
      error: error,
      message: "Unauthorized. Token invalid.",
      success: false,
      data: {},
    });
  }
};
