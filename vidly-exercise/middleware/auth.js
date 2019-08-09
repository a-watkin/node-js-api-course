const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("X-Auth-Token");
  // make sure the function exits here by using return
  if (!token) return res.status(401).send("Access denied. No token provided.");

  // if token is not valid it throws an exception
  try {
    const decodedPayload = jwt.verify(token, config.get("jwtPrivateKey"));
    // if the token is valid user becomes {_id: this._id } as defined in user model
    req.user = decodedPayload;

    // pass control to the next middleware function
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}

// you can also export the function above without naming it by just setting it to module.exports = function (req, res, next) {}
module.exports = auth;
