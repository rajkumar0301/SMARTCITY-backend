// middleware/auth.js
module.exports = function (req, res, next) {
  // Your auth logic
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Token validation logic here
  next();
};
