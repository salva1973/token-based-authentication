// Dependencies
import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()

// Register the home route (accessible without a token)
app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

// Register the route to get a new token
// In a real world scenario we would authenticate user credentials
// before creating a token, but for simplicity accessing this route
// will generate a new token that is valid for 2 minutes

app.get('/token', (req, res) => {
    const token = jwt.sign({username:"ado"}, 'supersecret', {expiresIn: 120})
    res.send(token)
})

// Register a route that requires a valid token to view data
app.get('/api', (req, res) => {
    var token = req.query.token    
    
    jwt.verify(token, 'supersecret', (err, decoded) => {
      if(!err){
        var secrets = {"accountNumber" : "938291239","pin" : "11289","account" : "Finance"}
        res.json(secrets)
      } else {
        res.send(err)
      }
    })
  })
  
  // Launch our app on port 3000
  app.listen('3000');
  console.log('API ready (localhost:3000)')