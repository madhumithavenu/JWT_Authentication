const express = require('express');

const app = express();

app.use('/',(req,res,next)=>{
    res.send('Hello Here!')
})

app.listen(5000,()=>{
    console.log('Listening to localhost 5000');
})