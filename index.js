const server = require('./api/server.js')

server.listen(5000, () => { // only one program can use 5000 at a time
    //success
    console.log('listening on port 5000! Yaaaaaas!')
})

// server is not a function because the file is empty, server is fleshed out then you
// nodemon will be happy again

// // import the server and start it
// console.log('Hello, Web45! Welcome.')
// const express = require('express') // import express from 'express' ES6 Modules

// const server = express () // instance of one express app
// server.get('/hello', (req, res) => {
//     // pull info of interest out of the request
//     //they get converted into objects and go into req
//     // we need to send back a response in the res object
//     res.json({ message:'Web 45 Rocks!' })
// })


// // order matters, always put the catchall at the end of your endpoints
// server.use('*', (req, res) => {
//     res.status(404).json({message: 'sorry bro, not found.'})
// })

