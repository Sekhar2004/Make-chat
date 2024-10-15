import bcrypt from 'bcrypt'
import UserModel from '../models/user.model.js'
import generateToken from '../utils/generateToken.js'

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        const token = generateToken(newUser)
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                pic: newUser.pic,
            },
            token,
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateToken(user)
        res.status(200).json({
            message: 'Login successful',
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              pic: user.pic,
            },
            token,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });         
    }
}

const allUser = async (req, res) => {
    try {
      const users = await UserModel.find({}, { password: 0 }); // Exclude the password field from the response
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching all users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};
const findUser = async (req, res) => {
    try {
        const keyword = req.query.search
        ? {
            $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};
        
        const users = await UserModel.find({ ...keyword, _id: { $ne: req.user._id } }, { password: 0 });
        
        res.status(200).json(users);
    } catch (error) {
        console.error('Error finding specific user:', error);
        res.status(500).json({ message: 'Internal Server Error' }); 
    }
}

const uploadPic = async (req, res) => {
    try {
        const {newPic} = req.body
        const user = await UserModel.findByIdAndUpdate(req.user._id, {pic: newPic}, {new: true})
        
        if(!user){
            return res.status(400).send('user not found')
        }else{
            res.json(user)
        }
    } catch (error) {
        console.error('Error during uploading pic chat:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export {registerUser, loginUser, allUser, findUser, uploadPic}