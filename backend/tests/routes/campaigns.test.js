require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const campaigns = require('../../routes/routes');

const app = express();
app.use(bodyParser.json());
app.use('/api/campaigns', campaigns);

describe('Campaigns API', () => {
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
});
