// src/controllers/characterController.js
const Character = require("../models/Character");
const Campaign = require("../models/Campaign");

// Get all characters
exports.getCharacters = async (req, res) => {
    try {
        const characters = await Character.find().populate("campaign");
        res.json(characters);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

// Create a character
exports.createCharacter = async (req, res) => {
    const { name, class: charClass, race, campaignId } = req.body;
    try {
        const campaign = await Campaign.findById(campaignId);
        if (!campaign)
            return res.status(404).json({ msg: "Campaign not found" });

        const newCharacter = new Character({
            name,
            class: charClass,
            race,
            campaign: campaignId,
        });
        const character = await newCharacter.save();

        campaign.characters.push(character._id);
        await campaign.save();

        res.json(character);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

// Update a character
exports.updateCharacter = async (req, res) => {
    const { name, class: charClass, race, campaignId } = req.body;
    try {
        const character = await Character.findById(req.params.id);
        if (!character)
            return res.status(404).json({ msg: "Character not found" });

        if (campaignId && campaignId !== character.campaign.toString()) {
            const newCampaign = await Campaign.findById(campaignId);
            const oldCampaign = await Campaign.findById(character.campaign);
            if (!newCampaign)
                return res.status(404).json({ msg: "New campaign not found" });

            oldCampaign.characters.pull(character._id);
            await oldCampaign.save();

            newCampaign.characters.push(character._id);
            await newCampaign.save();

            character.campaign = campaignId;
        }

        character.name = name || character.name;
        character.class = charClass || character.class;
        character.race = race || character.race;

        await character.save();
        res.json(character);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

// Delete a character
exports.deleteCharacter = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character)
            return res.status(404).json({ msg: "Character not found" });

        const campaign = await Campaign.findById(character.campaign);
        if (campaign) {
            campaign.characters.pull(character._id);
            await campaign.save();
        }

        await character.remove();
        res.json({ msg: "Character removed" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};
