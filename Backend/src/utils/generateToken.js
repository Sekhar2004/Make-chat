import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateToken = (newUser) => {
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    return token
}

export default generateToken
