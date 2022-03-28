// Import express
let express = require("express")

// Define the default path and the app
let app = express()
const PORT = 9000;

// Listen to the server
let server = app.listen(PORT)

// Add event listeners to the connection
server.on('listening', () => console.log("Listening on port " + PORT))
server.on('error', error => console.log("Error on connecting to the server" + error))

