const Location = require("../model/locationModel");

// Render Controller: Render index.html with locations using EJS
const renderLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.render("index", { locations }); // Render index.ejs with locations data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};
 
// Get Location by ID
const renderLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id);
    if (!location) {
      return res.render("notfound");
    }
    res.render("singlelocation", { location }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Location:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addlocation"); // Assuming "addlocation.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new location (used for rendering and API)
const addLocation = async (req, res) => {
  try {
    const { name, address, longitute, latitude } = req.body;
    // Convert the achieved field to a Boolean
    const achieved = req.body.achieved === "on";
    const newLocation = new Location({ name, address, longitute, latitude });
    await newLocation.save();
    // Redirect to the main page after successfully adding the location
    console.log("Location added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding location:", error);
    res.status(500).render("error");
  }
};


module.exports = {
  renderLocations,
  renderLocation,
  addLocation,
  renderForm,
};

