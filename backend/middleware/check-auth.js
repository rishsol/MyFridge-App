const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token, 'privateKey');
    next();
  } catch (err) {
    console.log('here');
    res.status(401).json({ err: err });
  }
};
