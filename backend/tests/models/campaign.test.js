require('dotenv').config({ path: '.env.test' });
const mongoose = require('mongoose');
const Campaign = require('../../models/campaign');
const Place = require('../../models/place');
const Character = require('../../models/character');

describe('Campaign Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Increase timeout for MongoDB server selection
        });
    }, 60000); // Increase timeout to 60 seconds

    afterAll(async () => {
        await mongoose.connection.close();
    }, 60000);

    it('create & save campaign successfully', async () => {
        const validCampaign = new Campaign({
            name: 'Test Campaign',
            system: 'D&D',
            places: [],
            characters: [],
        });
        const savedCampaign = await validCampaign.save();
        expect(savedCampaign._id).toBeDefined();
        expect(savedCampaign.name).toBe('Test Campaign');
        expect(savedCampaign.system).toBe('D&D');
    });

    it('insert campaign successfully, but the field not defined in schema should be undefined', async () => {
        const campaignWithInvalidField = new Campaign({
            name: 'Test Campaign',
            system: 'D&D',
            nickname: 'TC',
        });
        const savedCampaign = await campaignWithInvalidField.save();
        expect(savedCampaign._id).toBeDefined();
        expect(savedCampaign.nickname).toBeUndefined();
    });

    it('create campaign without required field should fail', async () => {
        const campaignWithoutRequiredField = new Campaign({ system: 'D&D' });
        let err;
        try {
            await campaignWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.name).toBeDefined();
    });
});
