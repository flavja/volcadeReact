import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {

    /**
     * Authenticate user with JWT token
     * @param {Request} req
     * @param {Response} res
     */
    static async authenticate(req, res) {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: 'Please provide all required credentials'});
        }

        try {
            const user = await User.findOne({email});
            const passwordsMatch = await user && bcrypt.compareSync(password, user.password);
            if (!user || !passwordsMatch) throw Error('Wrong Credentials');

            const token = jwt.sign({id: user._id}, "monsecret", {expiresIn: 3600});
            if (!token) throw Error('Token could not get signed');
            res.status(200).json({
                token,
                user: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    isAdmin: user.isAdmin
                }
            });
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }

    static async register(req, res) {
        let defaultAdmin;
        const {firstname, lastname, email, password, isAdmin} = req.body;
        if (!isAdmin) {
            defaultAdmin = false
        } else {
            defaultAdmin = true
        }
        if (!firstname || !lastname || !email || !password) return res.status(400).json({message: 'Please provide all necessary data'});

        try {
            const user = await User.findOne({email});
            if (user) throw Error('User with this email already registered.');

            const salt = await bcrypt.genSalt(10);
            if (!salt) throw Error('Something went wrong with bcrypt');

            const hash = await bcrypt.hash(password, salt);
            if (!hash) throw Error('Something went wrong while hashing the password');

            const newUser = new User({firstname, lastname, email, password: hash, defaultAdmin});

            const savedUser = await newUser.save();
            if (!savedUser) throw Error('Something went wrong when saving the user');

            const token = jwt.sign({id: savedUser._id}, "monsecret", {expiresIn: 3600});

            res.status(200).json({
                token,
                user: {
                    id: savedUser._id,
                    firstname: savedUser.firstname,
                    lastname: savedUser.lastname,
                    email: savedUser.email,
                    isAdmin: savedUser.isAdmin
                }
            });
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    /**
     * Get current user data
     */
    static async retrieve(req, res) {
        try {
            const user = await User.findById(req.user.id).select(['-__v', '-password']);
            if (!user) throw Error('User doesn\'t exist');
            res.json(user);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}

export default AuthController;
