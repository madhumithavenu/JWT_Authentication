const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://admin:JPEHjE4K51uMmpve@cluster0.tlp49tp.mongodb.net/auth?retryWrites=true&w=majority")
    .then(() => {
        app.listen(5000);
        console.log('Database Connected! Listening to localhost 5000');
    })
    .catch(err => console.log(err))

app.use('/', (req, res, next) => {
    res.send('Hello Here!')
})



// JPEHjE4K51uMmpve