// src/routes/CampaignRoutes.js
const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");

// Define route to get all campaigns
router.get("/", campaignController.getCampaigns);

// Define route to get a specific campaign by its ID
router.get("/:id", campaignController.getCampaignById);

// Define route to create a new campaign
router.post("/", campaignController.createCampaign);

// Define route to update a specific campaign by its ID
router.put("/:id", campaignController.updateCampaign);

// Define route to delete a specific campaign by its ID
router.delete("/:id", campaignController.deleteCampaign);

// Export the router to be used in other parts of the application
module.exports = router;
