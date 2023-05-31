const jwt = require("jsonwebtoken");
const User = require("../models/auth.model");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["Bearer"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded.id;
    console.log("user", req.user);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};


exports.requireAdminAuth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["Bearer"];
  if (!token) {
    return res.status(401).send({ error: 'Token missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.adminEmail = decoded.email;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Invalid token' });
  }
}




module.exports = { verifyToken};
