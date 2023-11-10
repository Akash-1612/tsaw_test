const jwt = require('jsonwebtoken');
const User = require('../models/User');



  const authMiddleware = async (req, res, next) => {
 
    if (req.method === 'OPTIONS') {
  
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Request-Headers', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
      res.sendStatus(200); 
    } else {

      const token = req.header('Authorization');


      if (!token) {
        return res.status(401).json({ error: 'Authorization denied. Token not found.' });
      }

      try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); 


        const user = await User.findById(decoded.user.id);
        if (!user) {
          return res.status(401).json({ error: 'Authorization denied. Invalid token.' });
        }

    
        req.user = user;

        next();
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
    }
  };

  module.exports = authMiddleware;
