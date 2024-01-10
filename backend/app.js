const express = require('express');
const mongoose = require('mongoose');
const router = require("./routes/user_routes.js")


const app = express();
app.use(express.json());
app.use('/api',router);

mongoose.connect("mongodb+srv://admin:JPEHjE4K51uMmpve@cluster0.tlp49tp.mongodb.net/auth?retryWrites=true&w=majority")
    .then(() => {
        app.listen(5000);
        console.log('Database Connected! Listening to localhost 5000');
    })
    .catch(err => console.log(err))




// JPEHjE4K51uMmpve