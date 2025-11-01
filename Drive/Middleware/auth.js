// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/user/login'); // 👈 not logged in
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store user info
    next(); // continue
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('/user/login');
  }
};
