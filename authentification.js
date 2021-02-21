const jwt = require("jsonwebtoken");

function authVerification(req, res, next) {
  const authBearer = req.headers["authorization"];
  const token = authBearer && authBearer.split(" ")[1];
  if (token === undefined)
    return res.status(401).json({ access: "Accès refusé " });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json(err);
    req.user = user;
    next();
  });
}

module.exports = authVerification;
