// ------------------------------------EXPRESS--------------------------------------------
// Import express
const { response } = require("express");
let express = require("express")

// Define the default path and the app
let app = express()
const PORT = 9000;

// Let app parse JSON in HTTP request bodies (middleware)
app.use(express.json())

// Listen to the server
let server = app.listen(PORT)

// Add event listeners to the connection
server.on('listening', () => console.log("Listening on port " + PORT))
server.on('error', error => console.log("Error on connecting to the server" + error))

// Root endpoint
app.get('/', (request, response) => {
  response.send("Hello, world!")
})

// --------------------------------------MONGOOSE-------------------------------------------
// Import mongoose
let mongoose = require("mongoose")

// Create a mongoose model and schema
let RollerCoaster = mongoose.model('RoallerCoaster', mongoose.Schema({
  name: String,
  year: Number,
  speed: Number
}))

// Connect to Mongodb
let mongooseConfig = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect("mongodb://127.0.0.1:27017/backend-review", mongooseConfig)

// Event listener for mongodb connection
mongoose.connection.on('connected', () => console.log("Connected to database"))
mongoose.connection.on('diconnected', () => console.log("Disconnected from the database"))
mongoose.connection.on('error', error => console.error("Database error", error))

// --------------------------------------------REST API------------------------------------
// Creating the API with REST patterns (endpoints)

// Create
app.post('/roller-coaster', (request, response) => {
  let rollercoaster = request.body;
  RollerCoaster
    .create(rollercoaster)
    .then(newRollerCoaster => response.json(newRollerCoaster))
})

// Read one
app.get('/roller-coaster/:id', (request, response) => {
  // response.send("Get roaller coaster " + request.params.id)
  let rollerCoasterId = request.params.id
  RollerCoaster
    .findById(rollerCoasterId)
    .then(rollerCoaster => response.json(rollerCoaster))
})

// Read all
app.get('/roller-coaster', (request, response) => {
  RollerCoaster
    .find()
    .then(RollerCoasters => response.json(RollerCoasters))
})

// Update
app.put('/roller-coaster/:id', (request, response) => {
  let rollerCoasterId = request.params.id;
  let newRollerCoasterData = request.body
  RollerCoaster
    .findByIdAndUpdate(rollerCoasterId, newRollerCoasterData, { new: true })
    .then(updatedRollerCoaster => response.json(updatedRollerCoaster))
})

// Delete
app.delete('/roller-coaster/:id', (request, response) => {
  let rollerCoasterId = request.params.id
  RollerCoaster
    .findByIdAndRemove(rollerCoasterId)
    .then(() => response.send("Deleted"))
})