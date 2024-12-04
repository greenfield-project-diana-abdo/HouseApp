const Property = require('../model/Property'); 

const createProperty = async (req, res) => {
    const { title, typeOfHouse, houseSize, numberOfRooms, typeOfService } = req.body;


    if (!title || !typeOfHouse || !houseSize || !numberOfRooms || !typeOfService ) {
        return res.status(400).send({ msg: "All fields are required." });
    }

    console.log("req.user:", req.user);
    if (!req.user || !req.user.fullName || !req.user.userId) {
        return res.status(403).send({ msg: "User not authenticated." });
    }

    const user_Id = req.user.userId; 
    const fullName = req.user.fullName;

    try {
        const newProperty = new Property({
            title,
            typeOfHouse,
            houseSize,
            numberOfRooms,
            typeOfService,
            fullName,
            userId: user_Id // Save the user's ID
        });

        await newProperty.save();
        return res.status(201).send({ msg: "Property posted successfully!", property: newProperty });
    } catch (error) {
        console.error("Error creating property:", error);
        return res.status(500).send({ msg: "Internal server error while creating property.", error });
    }
};


const getProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate("userId"); 
        return res.status(200).json(properties); 
    } catch (error) {
        console.error("Error fetching properties:", error);
        return res.status(500).send({ msg: "Internal server error while fetching properties." });
    }
};

const getPropertyById = async (req, res) => {
    const { id } = req.params; 
    try {
        const property = await Property.findById(id).populate("userId")
        if (!property) {
            return res.status(404).send({ msg: "Property not found." }); 
        }
        return res.status(200).json(property); 
    } catch (error) {
        console.error("Error fetching property:", error);
        return res.status(500).send({ msg: "Internal server error while fetching property." });
    }
};

const updateProperty = async (req, res) => {
    const { id } = req.params; 
    const { title, typeOfHouse, houseSize, numberOfRooms, typeOfService } = req.body;

    try {
        const property = await Property.findById(id);
        console.log(property)
        if (!property) {
            return res.status(404).send({ msg: "Property not found." });
        }

console.log(req.user)
        if (property.userId.toString() !== req.user.userId) {
            return res.status(403).send({ msg: "You do not have permission to edit this property." });
        }

        property.title = title || property.title;
        property.typeOfHouse = typeOfHouse || property.typeOfHouse;
        property.numberOfRooms = numberOfRooms || property.numberOfRooms;
        property.typeOfService = typeOfService || property.typeOfService;
        property.houseSize = houseSize || property.houseSize; 
      
        await property.save();
        return res.status(200).send({ msg: "Property updated successfully!", property });
    } catch (error) {
        console.error("Error updating property:", error);
        return res.status(500).send({ msg: "Internal server error while updating property." });
    }
};

const deleteProperty = async (req, res) => {
    const { id } = req.params; 

    try {
        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).send({ msg: "Property not found." });
        }


        if (property.userId.toString() !== req.user.userId) {
            return res.status(403).send({ msg: "You do not have permission to delete this property." });
        }

        await Property.findByIdAndDelete(id);
        return res.status(200).send({ msg: "Property deleted successfully!" });
    } catch (error) {
        console.error("Error deleting property:", error);
        return res.status(500).send({ msg: "Internal server error while deleting property." });
    }
};
module.exports = { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty }; 