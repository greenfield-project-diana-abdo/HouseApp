const Cleaner = require("../model/Cleaner");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

// REGISTER
const register = async (req, res) => {
    try {
        let { firstName, surname, location, experiences, references, email, password, role } = req.body; 

       
        if (!firstName || !surname || !email || !password || !role) { 
            return res.status(400).send({ msg: "Some information is missing in the registration form." });
        }

      
        let oldCleaner = await Cleaner.findOne({ email });
        if (oldCleaner) {
            return res.status(409).send({ msg: "User is already registered in our database." });
        }


        let hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUND); 

        await Cleaner.create({
            firstName,
            surname,
            location, 
            experiences: experiences ? Number(experiences) : undefined,
            references,
            email,
            password: hashedPassword,
            role 
        });

        return res.status(201).send({ msg: "Cleaner has been registered successfully.", status: true });

    } catch (error) {
        console.error("Registration error:", error); 
        return res.status(500).send({ msg: "Internal server error - register form", error });
    }
};

const login = async (req, res) => {
    try {
        let { email, password } = req.body;

      
        if (!email || !password) {
            return res.status(400).send({ msg: "Email and password are required for login." });
        }

        
        let isCleanerRegistered = await Cleaner.findOne({ email });
        if (!isCleanerRegistered) {
            return res.status(404).send({ msg: "Cleaner doesn't exist in our database." });
        }

        
        if (isCleanerRegistered.banned) {
            return res.status(403).send({ msg: "You have been banned by the administration." });
        }

        
        let isPasswordValid = await bcrypt.compare(password, isCleanerRegistered.password);
        if (!isPasswordValid) {
            return res.status(401).send({ msg: "Password is invalid." });
        }

       
        const payload = {
            userId: isCleanerRegistered._id,
            email: isCleanerRegistered.email,
            role: isCleanerRegistered.role,
            fullName: `${isCleanerRegistered.firstName} ${isCleanerRegistered.surname}` 
        };

        const token = await jwt.sign(payload, process.env.SECRET_KEY);

        return res.status(200).send({ 
            msg: "Login successful", 
            token, 
            status: true,
            role: payload.role,
            userId: payload.userId,
            fullName: payload.fullName 
         });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send({ msg: "Internal server error.", error });
    }
};

// GET ALL USERS (for admin panel)
const getAllUsers = async (req, res) => {
    try {
        const users = await Cleaner.find(); 
        return res.status(200).send(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).send({ msg: "Internal server error while fetching users.", error });
    }
};

// DELETE USER BY ID
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedUser = await Cleaner.findByIdAndDelete(id); 

        if (!deletedUser) {
            return res.status(404).send({ msg: "User not found." });
        }

        return res.status(200).send({ msg: "User deleted successfully." });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).send({ msg: "Internal server error while deleting user.", error });
    }
};

// BAN USER BY ID
const banUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const bannedUser = await Cleaner.findByIdAndUpdate(id, { banned: true }, { new: true }); 

        if (!bannedUser) {
            return res.status(404).send({ msg: "User not found." });
        }

        return res.status(200).send({ msg: "User has been banned successfully." });
    } catch (error) {
        console.error("Error banning user:", error);
        return res.status(500).send({ msg: "Internal server error while banning user.", error });
    }
};

// UPDATE USER BY ID
const updateUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const { firstName, surname, email, location, experiences, references, role } = req.body;

    
       if (!firstName || !surname || !email || !role) {
           return res.status(400).send({ msg: "Some information is missing." });
       }

       
       const updatedUser = await Cleaner.findByIdAndUpdate(id, {
           firstName,
           surname,
           email,
           location,
           experiences: experiences ? Number(experiences) : undefined,
           references,
           role
       }, { new: true });

       if (!updatedUser) {
           return res.status(404).send({ msg: "User not found." });
       }

       return res.status(200).send({ msg: "User updated successfully.", updatedUser });
   } catch (error) {
       console.error("Error updating user:", error);
       return res.status(500).send({ msg: "Internal server error while updating user.", error });
   }
};

// UNBAN USER BY ID
const unbanUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const unbannedUser = await Cleaner.findByIdAndUpdate(id, { banned: false }, { new: true }); 

        if (!unbannedUser) {
            return res.status(404).send({ msg: "User not found." });
        }

        return res.status(200).send({ msg: "User has been unbanned successfully." });
    } catch (error) {
        console.error("Error unbanning user:", error);
        return res.status(500).send({ msg: "Internal server error while unbanning user.", error });
    }
};

const fetchUserById = async (req, res) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ msg: "Invalid user ID." });
    }

    try {
        const cleaner = await Cleaner.findById(id); 
        if (!cleaner) {
            return res.status(404).send({ msg: "User not found." });
        }
        return res.status(200).send(cleaner);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).send({ msg: "Internal server error.", error });
    }
};


module.exports = { register, login, getAllUsers, deleteUserById, banUserById, unbanUserById, updateUser, fetchUserById };