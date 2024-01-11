const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path: '../.env'});

function verifyToken(req, res, next){
    const headers = req.headers[`authorization`];
    const token = headers.split(" ")[1];
    if(!token){
        return res.status(404).json({message: "No token found"});
    }
    jwt.verify(String(token),process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
          return res.status(400).json({message: "Invalid token"});
        }
        console.log(user);
    });
};

exports.verifyToken = verifyToken;