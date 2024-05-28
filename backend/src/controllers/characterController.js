const Character = require("../models/Character");
const Campaign = require("../models/Campaign");

// Get all characters
exports.getCharacters = async (req, res) => {
    try {
        const characters = await Character.find().populate("characterCampaign");
        res.json(characters);
    } catch (err) {
        console.error('Error getting characters:', err);
        res.status(500).send("Server Error");
    }
};

// Create a character
exports.createCharacter = async (req, res) => {
    const {
        characterName,
        characterClass: charClass,
        characterRace,
        campaignId,
    } = req.body;
    try {
        console.log('Campaign ID:', campaignId);
        const campaign = await Campaign.findById(campaignId);
        console.log('Campaign:', campaign);
        if (!campaign) {
            return res.status(404).json({ msg: "Campaign not found" });
        }

        const newCharacter = new Character({
            characterName,
            characterClass: charClass,
            characterRace,
            characterCampaign: campaignId,
        });

        const character = await newCharacter.save();
        console.log('Created character:', character);

        campaign.campaignCharacters.push(character._id);
        await campaign.save();
        console.log('Updated campaign:', campaign);

        // Populate the characterCampaign field before sending the response
        const populatedCharacter = await Character.findById(character._id).populate('characterCampaign');
        res.json(populatedCharacter);
    } catch (err) {
        console.error('Error creating character:', err);
        res.status(500).send("Server Error");
    }
};


// Update a character
exports.updateCharacter = async (req, res) => {
    const {
        characterName,
        characterClass: charClass,
        characterRace,
        campaignId,
    } = req.body;
    try {
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ msg: "Character not found" });
        }

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

        character.characterName = characterName || character.characterName;
        character.characterClass = charClass || character.characterClass;
        character.characterRace = characterRace || character.characterRace;

        await character.save();
        res.json(character);
    } catch (err) {
        console.error('Error updating character:', err);
        res.status(500).send("Server Error");
    }
};


// Delete a character
exports.deleteCharacter = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ msg: "Character not found" });
        }

        if (character.characterCampaign) {
            const campaign = await Campaign.findById(character.characterCampaign);
            if (campaign) {
                campaign.campaignCharacters.pull(character._id);
                await campaign.save();
            }
        }

        await Character.deleteOne({ _id: req.params.id });
        res.json({ msg: "Character removed" });
    } catch (err) {
        console.error('Error deleting character:', err);
        res.status(500).send("Server Error");
    }
};
