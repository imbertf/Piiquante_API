const jwt = require('jsonwebtoken');
require('dotenv').config();
 
// Check user authentication
// extract token from entering request
// apply verify function to decode token
// extract userId from token then add it to request Object to allow use by routes
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};