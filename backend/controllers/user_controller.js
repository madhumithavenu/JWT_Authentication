const User = require('../model/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

async function signup(req, res, next) {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.log(err);
    }
    if (existingUser) {
        return res.status(400).json({ message: "User already exists! Login Instead" })
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
    });
    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }

    return res.status(201).json({ message: user })
}

async function login(req, res, next) {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        return new Error(err);
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User not found! Signup Please" })
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid Password" })
    }
    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "35s"
    });
    console.log("generated token\n", token);
    if (req.cookies[`${existingUser._id}`]) {
        req.cookies[`${existingUser._id}`] = ""
    }

    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: 'lax'
    })

    return res.status(200).json({ message: 'Successfully Loggedin', user: existingUser, token });
}


async function getUser(req, res) {
    const userID = req._id;
    let user;
    try {
        user = await User.findById(userID, "-password");
    } catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(401).json({ message: "User Not Found" });
    }
    return res.status(200).json({ user });
}


function refreshToken(req, res, next) {

}

exports.signup = signup;
exports.login = login;
exports.getUser = getUser;