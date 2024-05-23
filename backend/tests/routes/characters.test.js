require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('../../routes/routes'); // Assuming the routes for characters are also in routes.js
const Character = require('../../models/character');

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

describe('Characters API', () => {
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

    it('POST /api/characters - success', async () => {
        const res = await request(app).post('/api/characters').send({
            player: 'John Doe',
            name: 'Test Character',
            class: 'Warrior',
            race: 'Human',
            pronoun: 'He/Him',
            level: 1,
            places: [],
            campaigns: []
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Test Character');
        expect(res.body.class).toBe('Warrior');
    });

    it('POST /api/characters - failure due to missing fields', async () => {
        const res = await request(app).post('/api/characters').send({
            name: 'Test Character',
            class: 'Warrior',
            race: 'Human',
            pronoun: 'He/Him',
            level: 1,
            places: [],
            campaigns: []
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });
});
