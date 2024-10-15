import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? 
        req.headers.authorization.split(' ')[1] : null;

        if (!token) {
            res.status(401);
            throw new Error('Not authorized, no token');
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            res.status(401);
            throw new Error('Not authorized, user not found');
        }

        req.user = user;
        next(); 
    } catch (error) {
        console.error('Error during token verification:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });        
    }
}

export default verifyToken