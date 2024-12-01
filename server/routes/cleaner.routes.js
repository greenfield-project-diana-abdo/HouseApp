const express = require("express");
const { 
    register, 
    login, 
    getAllUsers, 
    deleteUserById, 
    banUserById, 
    unbanUserById, 
    updateUser,
    fetchUserById 
} = require("../controllers/cleaner.controller");
const Cleaner = require("../model/Cleaner"); 
const router = express.Router();


router.post("/register", register);
router.post("/login", login);

router.get("/", getAllUsers); 

// Route to get all cleaners
router.get("/cleaners", async (req, res) => {
    try {
        const cleaners = await Cleaner.find({ role: "Cleaner" });
        return res.status(200).send(cleaners);
    } catch (error) {
        console.error("Error fetching cleaners:", error);
        return res.status(500).send({ msg: "Internal server error while fetching cleaners.", error });
    }
});

router.get("/:id", fetchUserById); 

router.delete("/:id", deleteUserById); // Delete user by ID

// Route to ban a user by ID
router.patch("/:id/ban", banUserById); // Ban user by ID

// Route to unban a user by ID
router.patch("/:id/unban", unbanUserById); // Unban user by ID

// Route to update user information
router.put("/:id", updateUser); // Update user information

// Route to update user role
router.patch("/:id/role", async (req, res) => {
    try {
        const { role } = req.body;
        if (!role) {
            return res.status(400).send({ msg: "Role is required." });
        }
        
        const cleaner = await Cleaner.findByIdAndUpdate(req.params.id, { role }, { new: true });
        if (!cleaner) {
            return res.status(404).send({ msg: "Cleaner not found." });
        }

        return res.status(200).send({ msg: "Role updated successfully.", cleaner });
    } catch (error) {
        console.error("Error updating role:", error);
        return res.status(500).send({ msg: "Internal server error.", error });
    }
});

module.exports = router;