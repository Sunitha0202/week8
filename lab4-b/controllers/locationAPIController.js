const Location = require("../model/locationModel");

// get all Locations
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Location
const addLocation = async (req, res) => {
  // console.log();
  try {
    const { name, address, longitute, latitude } = req.body;
    const newLocation = new Location({ name, address, longitute, latitude });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};