import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
export const  singnUp = async(req, res) => {
    const { username , email, password } = req.body;
    if (!username || !password || !email || username ===''|| password === '' || email ==='') {
        return res.status(401).json({ message : 'All fields required for login' });
    }
    const hashedPassword = bcryptjs.hashSync(password , 10)

    const newUser = new User({
        username,
         email,
         password : hashedPassword 
        });
    
    try {
        await newUser.save();
        res.json('singnUp successful ')
    } catch (error) {
        res.json({ message : error.message })    
    }
};

export const signIn = (req, res) => {
    res.json("hey i am live ")
}