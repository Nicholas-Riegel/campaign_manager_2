//src/controllers/characterController.js
const Character = require("../models/Character");
const Campaign = require("../models/Campaign");

// Get all characters
exports.getCharacters = async (req, res) => {
    try {
        // Find all characters and populate their associated campaigns
        const characters = await Character.find().populate("characterCampaign");
        res.json(characters);
    } catch (err) {
        // Log error and send server error response if there's an issue
        console.error("Error getting characters:", err);
        res.status(500).send("Server Error");
    }
};

// Create a character
exports.createCharacter = async (req, res) => {
    const { characterName, characterClass: charClass, characterRace, campaignId } = req.body;
    try {
        let campaign = null;

        // Check if a campaign ID is provided and if the campaign exists
        if (campaignId) {
            console.log("Campaign ID:", campaignId);
            campaign = await Campaign.findById(campaignId);
            console.log("Campaign:", campaign);
            if (!campaign) {
                return res.status(404).json({ msg: "Campaign not found" });
            }
        }

        // Create a new character with the provided details
        const newCharacter = new Character({
            characterName,
            characterClass: charClass,
            characterRace,
            characterCampaign: campaignId || null,
        });

        const character = await newCharacter.save();
        console.log("Created character:", character);

        // If the character is associated with a campaign, update the campaign's character list
        if (campaign) {
            campaign.campaignCharacters.push(character._id);
            await campaign.save();
            console.log("Updated campaign:", campaign);
        }

        // Populate the character's campaign field before sending the response
        const populatedCharacter = await Character.findById(character._id).populate("characterCampaign");
        res.json(populatedCharacter);
    } catch (err) {
        // Log error and send server error response if there's an issue
        console.error("Error creating character:", err);
        res.status(500).send("Server Error");
    }
};

// Update a character
exports.updateCharacter = async (req, res) => {
    const { characterName, characterClass: charClass, characterRace, campaignId } = req.body;
    try {
        // Find the character by its ID
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ msg: "Character not found" });
        }

        // Handle the update of the character's associated campaign
        if (campaignId && campaignId !== character.characterCampaign.toString()) {
            const newCampaign = await Campaign.findById(campaignId);
            const oldCampaign = await Campaign.findById(character.characterCampaign);
            if (!newCampaign) {
                return res.status(404).json({ msg: "New campaign not found" });
            }

            oldCampaign.characters.pull(character._id);
            await oldCampaign.save();

            newCampaign.characters.push(character._id);
            await newCampaign.save();

            character.characterCampaign = campaignId;
        }

        // Update character fields if new values are provided
        character.characterName = characterName || character.characterName;
        character.characterClass = charClass || character.characterClass;
        character.characterRace = characterRace || character.characterRace;

        // Save the updated character
        await character.save();
        res.json(character);
    } catch (err) {
        // Log error and send server error response if there's an issue
        console.error("Error updating character:", err);
        res.status(500).send("Server Error");
    }
};

// Delete a character
exports.deleteCharacter = async (req, res) => {
    try {
        // Find the character by its ID
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ msg: "Character not found" });
        }

        // If the character is associated with a campaign, update the campaign's character list
        if (character.characterCampaign) {
            const campaign = await Campaign.findById(character.characterCampaign);
            if (campaign) {
                campaign.campaignCharacters.pull(character._id);
                await campaign.save();
            }
        }

        // Delete the character
        await Character.deleteOne({ _id: req.params.id });
        res.json({ msg: "Character removed" });
    } catch (err) {
        // Log error and send server error response if there's an issue
        console.error("Error deleting character:", err);
        res.status(500).send("Server Error");
    }
};

