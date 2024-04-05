const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");

const blogAPI = require("./controllers/locationAPIController");
const blogSSR = require("./controllers/locationSSRController");

//Important: will be discussed next week
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//https://expressjs.com/en/resources/middleware/method-override.html
app.use(methodOverride('_method'))

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

const logger = (req, res, next) => {
    console.log("Method:", req.method);
    console.log("Path:  ", req.path);
    console.log("Body:  ", req.body);
    console.log("---");
    // console.log("Hello V2!");
    next();
  };
  
  app.use(logger)
  
  // SSR
// Route to render index.html with locations using EJS
app.get("/", blogSSR.renderLocations);
// Define a route to render the addlocation.ejs view
app.get("/addlocation", blogSSR.renderForm);
// Route to add  location using EJ
app.post("/addlocation", blogSSR.addLocation);
// Define a route to render the singlelocation.ejs view
app.get("/single-location/:id", blogSSR.renderLocation);

// API
// GET all locations
app.get("/api/locations", blogAPI.getLocations);
// POST a new location
app.post("/api/locations", blogAPI.addLocation);
// GET a single location
app.get("/api/locations/:id", blogAPI.getLocation);
// Update location using PUT
app.put("/api/locations/:id", blogAPI.updateLocation);
// DELETE a location
app.delete("/api/locations/:id", blogAPI.deleteLocation);
// DELETE all location
app.delete("/api/locations", blogAPI.deleteAllLocations);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});