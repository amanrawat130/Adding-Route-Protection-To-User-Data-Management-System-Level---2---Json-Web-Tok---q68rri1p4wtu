const jwt = require('jsonwebtoken');
const JWT_SECRET = 'newtonSchool';

function protectAdminRoutes(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: Missing token.', status: 'Error' });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (decodedToken.role !== 'admin' && decodedToken.role !== 'superadmin') {
      return res.status(403).json({ message: 'Authorization failed: User is not an admin.', status: 'Error' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentication failed: Invalid token.', status: 'Error' });
  }
}

module.exports = protectAdminRoutes;
