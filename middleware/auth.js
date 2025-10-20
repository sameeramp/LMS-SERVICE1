import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const verifyToken = (req, res, next) => {

    let token = 
    req.body.token || 
    req.query.token || 
    req.headers["authorization"];

    if (!token) {
      return res.status(403).send("token is required for authentication");
    }
    
    try {    
        token = token.replace(/^Bearer\s+/, "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
      } catch (error) {
        res.status(401).send("Invalid Token");
      }
      return next();
};