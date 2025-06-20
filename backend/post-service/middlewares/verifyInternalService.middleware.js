require('dotenv').config();

const verifyInternalService = (req, res, next) => {
  const token = req.headers['y-service-auth'];

  if (!token || token !== process.env.SERVICE_SECRET) {
    return res.status(403).json({ message: 'Forbidden: Invalid service token' });
  }

  next();
};

module.exports = verifyInternalService;
