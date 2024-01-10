const User = require('../model/User.js');

async function signup(req, res, next) {
    const { name, email, password } = req.body;
    let existingUser;
    
    const user = new User({
        name,
        email,
        password,
    });
    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }

    return res.status(201).json({ message: user })
}

exports.signup = signup;