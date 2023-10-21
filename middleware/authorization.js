const jwt = require("jsonwebtoken");
const access_token_secret = process.env.ACCESS_TOKEN;

const sign = (body) => {
  return jwt.sign(body, access_token_secret);
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, access_token_secret, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);
    console.log("inside auth", user);
    req.user = user;

    next();
  });
}

module.exports = { sign, authenticateToken };
