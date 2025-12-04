import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "7d"});
};

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        console.log(name, 'naem')
        if(name === '' || name === undefined) {
            return res.json('Name is required');
        }
        console.log('1')
        const userExists = await User.findOne({ email });
        if(userExists) return res.status(400).send({ success: false, message: 'Email already Registered' });

        const user = new User({ name, email, password });
        await user.save();
        return res.status(200).send({ success: true, message: "User Created Successfully!"});

    } catch (error) {
        return res.status(500).send({ success: false, message: `Internal Server Error: ${error.message}`});
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user) return res.status(400).send({ success: false, message: 'Invalid Email or Password'});

        const isPasswordMatch =await user.comparePassword(password);
        if(!isPasswordMatch) return res.status(400).send({ success: false, message: 'Invalid Email or Password'});

        const token = await generateToken(user._id);
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt
        }
        return res.status(200).send({ success: true, message: 'User found Successfully', data : userData, token });

    } catch (error) {
        return res.status(500).send({ success: false, message: `Internal Server Error: ${error.message}`});
    }
};
