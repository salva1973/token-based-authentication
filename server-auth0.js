// Dependencies
import express from 'express'
import jwt from 'express-jwt'
import { config } from './config.js'

const { app: { port }, token: { cliendId, clientSecret } } = config

var jwtCheck = jwt({
  secret: new Buffer.from(clientSecret, 'base64'),  
  algorithms: ['RS256'],
  audience: cliendId
})

const app = express()

// Rather than checking for a token within our controller
// we'll use a middleware so if the token is invalid we'll
// stop further execution of the request
app.use('/api', jwtCheck)

// Register the home route (accessible without a token)
app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

app.get('/api', function(req, res){
  var secrets = {"accountNumber" : "XX11XX22","pin" : "XX1ZZ","account" : "Finance"}
  res.json(secrets)
})
  
  // Launch our app on port 3000
  app.listen(port);
  console.log('API ready (localhost:3000)')