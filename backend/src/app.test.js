// src/app.test.js
const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');

describe('Campaign API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new campaign', async () => {
    const res = await request(app)
      .post('/api/campaigns')
      .send({
        campaignName: 'Test Campaign',
        campaignSystem: 'Test System',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.campaignName).toBe('Test Campaign');
    expect(res.body.campaignSystem).toBe('Test System');
  });

  // Add more test cases for other API endpoints
});

describe('Character API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new character', async () => {
    // Create a campaign first
    const campaignRes = await request(app)
      .post('/api/campaigns')
      .send({
        campaignName: 'Test Campaign',
        campaignSystem: 'Test System',
      });

    const res = await request(app)
      .post('/api/characters')
      .send({
        characterName: 'Test Character',
        characterClass: 'Test Class',
        characterRace: 'Test Race',
        campaignId: campaignRes.body._id,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.characterName).toBe('Test Character');
    expect(res.body.characterClass).toBe('Test Class');
    expect(res.body.characterRace).toBe('Test Race');
    expect(res.body.characterCampaign).toBe(campaignRes.body._id);
  });

  // Add more test cases for other API endpoints
});