require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('../../routes/routes'); // Correct the path to 'routes.js'
const Campaign = require('../../models/campaign');
const Place = require('../../models/place');
const Character = require('../../models/character');

const app = express();
app.use(bodyParser.json());
app.use('/api/campaigns', routes);

describe('Campaigns API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
        });
    }, 60000);

    afterAll(async () => {
        await mongoose.connection.close();
    }, 60000);

    it('GET /api/campaigns - success', async () => {
        const res = await request(app).get('/api/campaigns');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('POST /api/campaigns - success', async () => {
        const newPlace = new Place({
            name: 'Test Place',
            type: 'Town'
        });
        const savedPlace = await newPlace.save();

        const newCharacter = new Character({
            player: 'John Doe',
            name: 'Test Character',
            class: 'Warrior',
            race: 'Human',
            pronoun: 'He/Him',
            level: 1
        });
        const savedCharacter = await newCharacter.save();

        const res = await request(app).post('/api/campaigns').send({
            name: 'New Campaign',
            system: 'D&D',
            places: [savedPlace._id],
            characters: [savedCharacter._id],
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('New Campaign');
        expect(res.body.places).toContain(savedPlace._id.toString());
        expect(res.body.characters).toContain(savedCharacter._id.toString());
        
        // Verify data in the database
        const campaignInDb = await Campaign.findById(res.body._id).populate('places characters');
        console.log("Campaign in DB:", JSON.stringify(campaignInDb, null, 2)); // Add this line
        expect(campaignInDb).not.toBeNull();
        expect(campaignInDb.places[0]._id.toString()).toBe(savedPlace._id.toString());
        expect(campaignInDb.characters[0]._id.toString()).toBe(savedCharacter._id.toString());
    });

    it('POST /api/campaigns - failure due to missing fields', async () => {
        const res = await request(app).post('/api/campaigns').send({
            system: 'D&D',
            places: [],
            characters: [],
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });

    it('DELETE /api/campaigns/:id - success', async () => {
        const newCampaign = new Campaign({
            name: 'Delete Test Campaign',
            system: 'D&D',
            places: [],
            characters: [],
        });
        const savedCampaign = await newCampaign.save();

        const res = await request(app).delete(`/api/campaigns/${savedCampaign._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);

        // Verify data is deleted from the database
        const deletedCampaign = await Campaign.findById(savedCampaign._id);
        expect(deletedCampaign).toBeNull();
    });

    it('DELETE /api/campaigns/:id - failure for non-existing campaign', async () => {
        const res = await request(app).delete('/api/campaigns/60c72b2f9b1d8c1b4c8e4a9a');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'Campaign not found');
    });

    it('PUT /api/campaigns/:id - success', async () => {
        const newCampaign = new Campaign({
            name: 'Update Test Campaign',
            system: 'D&D',
            places: [],
            characters: [],
        });
        const savedCampaign = await newCampaign.save();

        const res = await request(app).put(`/api/campaigns/${savedCampaign._id}`).send({
            name: 'Updated Campaign',
            system: 'Pathfinder',
            places: [],
            characters: [],
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Updated Campaign');
        expect(res.body.system).toBe('Pathfinder');

        // Verify data is updated in the database
        const updatedCampaign = await Campaign.findById(res.body._id);
        expect(updatedCampaign.name).toBe('Updated Campaign');
        expect(updatedCampaign.system).toBe('Pathfinder');
    });

    it('PUT /api/campaigns/:id - failure for non-existing campaign', async () => {
        const res = await request(app).put('/api/campaigns/60c72b2f9b1d8c1b4c8e4a9a').send({
            name: 'Updated Campaign',
            system: 'Pathfinder',
            places: [],
            characters: [],
        });
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'Campaign not found');
    });
});
