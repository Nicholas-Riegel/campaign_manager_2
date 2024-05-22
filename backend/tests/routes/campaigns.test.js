require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const campaigns = require('../../routes/routes');
const Campaign = require('../../models/campaign');

const app = express();
app.use(bodyParser.json());
app.use('/api/campaigns', campaigns);

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
        const res = await request(app).post('/api/campaigns').send({
            name: 'New Campaign',
            system: 'D&D',
            players: [],
            places: [],
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('New Campaign');
    });

    it('POST /api/campaigns - failure due to missing fields', async () => {
        const res = await request(app).post('/api/campaigns').send({
            system: 'D&D',
            players: [],
            places: [],
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });

    it('DELETE /api/campaigns/:id - success', async () => {
        const newCampaign = new Campaign({
            name: 'Delete Test Campaign',
            system: 'D&D',
            players: [],
            places: [],
        });
        const savedCampaign = await newCampaign.save();

        const res = await request(app).delete(`/api/campaigns/${savedCampaign._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
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
            players: [],
            places: [],
        });
        const savedCampaign = await newCampaign.save();

        const res = await request(app).put(`/api/campaigns/${savedCampaign._id}`).send({
            name: 'Updated Campaign',
            system: 'Pathfinder',
            players: [],
            places: [],
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Updated Campaign');
        expect(res.body.system).toBe('Pathfinder');
    });

    it('PUT /api/campaigns/:id - failure for non-existing campaign', async () => {
        const res = await request(app).put('/api/campaigns/60c72b2f9b1d8c1b4c8e4a9a').send({
            name: 'Updated Campaign',
            system: 'Pathfinder',
            players: [],
            places: [],
        });
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'Campaign not found');
    });
});
