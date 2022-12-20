const jwt = require("jsonwebtoken");
const GlobalError = require("../utils/globalError");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    throw new GlobalError("Not authenticated. ", 401);
  }

  const token = req.get("Authorization").split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    throw new GlobalError("Not authenticated. ", 401);
  }

  req.userId = decodedToken.userId;
  next();
};
