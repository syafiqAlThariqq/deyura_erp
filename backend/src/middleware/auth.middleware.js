const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({
        status: false,
        message: 'Unauthorized'
      });

    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      status: false,
      message: 'Invalid token'
    });

  }

};

exports.roleMiddleware = (...roles) => {

  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {

      return res.status(403).json({
        status: false,
        message: 'Forbidden Access'
      });

    }

    next();

  };

};