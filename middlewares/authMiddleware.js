const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res.status(400).send({
        success: false,
        message: "Authorization token is missing",
      });
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "Token is missing",
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth failed",
        });
      } else {
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Server error",
    });
  }
};
