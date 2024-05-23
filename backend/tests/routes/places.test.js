require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('../../routes/routes'); // Assuming the routes for places are also in routes.js
const Place = require('../../models/place');

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

describe('Places API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
        });
    }, 60000);

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    }, 60000);

    it('POST /api/places - success', async () => {
        const res = await request(app).post('/api/places').send({
            name: 'Test Place',
            type: 'Town',
            charactersPresent: [],
            campaign: null
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Test Place');
        expect(res.body.type).toBe('Town');
    });

    it('POST /api/places - failure due to missing fields', async () => {
        const res = await request(app).post('/api/places').send({
            type: 'Town',
            charactersPresent: [],
            campaign: null
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });
});
