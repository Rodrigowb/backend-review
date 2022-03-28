// Import express and mongoose
let express = require("express");
let mongoose = require("mongoose")

// Create a mongoose model and schema
let RollerCoaster = mongoose.model('RoallerCoaster', mongoose.Schema({
  name: String,
  year: Number,
  speed: Number
}))

// Seed the db with initial data
RollerCoaster
  .create({
    "name": "Hulk",
    "year": 2012,
    "speed": 200
  })
  .then(() => {
    console.log('Inserted Roller Coaster')
    mongoose.connection.close()
  })
  .catch((error) => console.error("Error inserting roller coaster", error))

// Connect to Mongodb
let mongooseConfig = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect("mongodb://127.0.0.1:27017/backend-review", mongooseConfig)

// Event listener for mongodb connection
mongoose.connection.on('connected', () => console.log("Connected to database"))
mongoose.connection.on('diconnected', () => console.log("Disconnected from the database"))
mongoose.connection.on('error', error => console.error("Database error", error))

