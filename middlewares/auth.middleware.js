import jwt from "jsonwebtoken";

export const IsLoggedIn = async (req, res, next) => {
  try {
    console.log(req.cookies);
    let token = req.cookies?.token;

    console.log("Token FOund", token ? "yes" : "no");

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized. Token not found.",
        success: false,
        data: {},
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decode);
    
    req.user = decode;

    next();
  } catch (error) {
    console.log("Failure in Auth Middleware",error);
    res.status(401).json({
      error: error,
      message: "Unauthorized. Token invalid.",
      success: false,
      data: {},
    });
  }
  
};
