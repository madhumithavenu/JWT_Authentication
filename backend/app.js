const express = require('express');
const mongoose = require('mongoose');
const router = require("./routes/user_routes.js");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config({path: './.env'});

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(5000))
    .then(() => console.log('Database Connected! Listening to localhost 5000'))
    .catch(err => console.log(err))




// JPEHjE4K51uMmpve