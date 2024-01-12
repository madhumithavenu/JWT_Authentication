const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

function refreshToken(req, res, next) {

    const cookies = req.headers.cookie;
    if (!cookies) {
        return res.status(402).json({ message: "No token found" });
    }

    const prevToken = cookies.split('=')[1];
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" });
        }
        res.clearCookie(`${user._id}`);
        req.cookies[`${user._id}`] = "";

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "35s"
        })
        console.log("Regenerated token\n", token);

        res.cookie(String(user._id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: 'lax'
        });

        req._id = user._id;
        next();
    });
};

exports.refreshToken = refreshToken;