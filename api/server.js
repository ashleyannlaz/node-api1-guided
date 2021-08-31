// IMPORTS AT THE TOP
const express = require('express') // import express from 'express' ES6 Modules
const Dog = require('./dog-model.js')

// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json()) // teaches express to read JSON

// ENDPOINTS
server.get('/', (req, res) => {
    res.status(200).json({ message: 'what up' })
})

// [GET] / (Hello World endpoint)
server.get('/api/dogs/:id', (req, res) => {
    //res.json('fetch dog by its id')
    Dog.findById(req.params.id)
    .then(dog => {
        if(dog) {
            res.status(200).json(dog)
        } else {
            console.log('it works')
            res.status(404).json({message:'this id not found'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message})
    })
})
// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get('/api/dogs', (req, res) => {
    Dog.findAll()
    .then(dogs => {
        res.status(200).json(dogs)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
    //res.json('fetch all dogs')
})
// [GET] /api/dogs (R of CRUD, fetch all dogs)
// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
server.post('/api/dogs', (req,res) => {
    //res.json('create a new dog!')
    const newDog = req.body
    Dog.create(newDog)
    .then(dog => {
        res.status(201).json(dog)
    })
    
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
})

// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put('/api/dogs/:id', async (req,res) => {
    //res.json('update the dog data')
    const { id } = req.params
    const changes = req.body
    try { const result = await Dog.update(id,changes)
            res.status(200).json(result)
        } catch (err) { 
            console.log(err)
            res.status(500).json({ message: err.message })
    }
})

// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete('/api/dogs/:id', (req,res) => {
    Dog.delete(req.params.id)
    .then(dog => {
        if(dog) { res.status(200)
        } else {
            res.status(404).json({ message: `dog ${req.params.id} is not real`})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
    //res.json('Delete this dog')
})


// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server
