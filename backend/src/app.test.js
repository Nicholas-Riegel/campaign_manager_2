const request = require("supertest");
const app = require("./app");
const mongoose = require("mongoose");
const Campaign = require("./models/Campaign");
const Character = require("./models/Character");

let campaignId;
let characterId;

describe("Campaign API", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {});
    });

    afterAll(async () => {
        await Campaign.deleteMany();
        await Character.deleteMany();
        await mongoose.connection.close();
    });

    it("should create a new campaign", async () => {
        const res = await request(app)
            .post("/api/campaigns")
            .send({
                campaignName: "Test Campaign",
                campaignSystem: "Test System",
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.campaignName).toBe("Test Campaign");
        expect(res.body.campaignSystem).toBe("Test System");
        campaignId = res.body._id;
    });

    it("should get all campaigns", async () => {
        const res = await request(app).get("/api/campaigns");
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should update a campaign", async () => {
        const res = await request(app)
            .put(`/api/campaigns/${campaignId}`)
            .send({
                campaignName: "Updated Campaign",
                campaignSystem: "Updated System",
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.campaignName).toBe("Updated Campaign");
        expect(res.body.campaignSystem).toBe("Updated System");
    });

    it("should delete a campaign", async () => {
        const res = await request(app).delete(`/api/campaigns/${campaignId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.msg).toBe("Campaign removed");
    });
});

describe("Character API", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {});
        const campaign = new Campaign({
            campaignName: "Test Campaign",
            campaignSystem: "Test System",
        });
        await campaign.save();
        campaignId = campaign._id;
    });

    afterAll(async () => {
        await Campaign.deleteMany();
        await Character.deleteMany();
        await mongoose.connection.close();
    });

    it("should create a new character", async () => {
        const res = await request(app)
            .post("/api/characters")
            .send({
                characterName: "Test Character",
                characterClass: "Test Class",
                characterRace: "Test Race",
                campaignId: campaignId,
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.characterName).toBe("Test Character");
        expect(res.body.characterClass).toBe("Test Class");
        expect(res.body.characterRace).toBe("Test Race");
        expect(res.body.characterCampaign._id.toString()).toEqual(campaignId.toString());
        characterId = res.body._id;
    });
    

    it("should get all characters", async () => {
        const res = await request(app).get("/api/characters");
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should update a character", async () => {
        const res = await request(app)
            .put(`/api/characters/${characterId}`)
            .send({
                characterName: "Updated Character",
                characterClass: "Updated Class",
                characterRace: "Updated Race",
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.characterName).toBe("Updated Character");
        expect(res.body.characterClass).toBe("Updated Class");
        expect(res.body.characterRace).toBe("Updated Race");
    });
    
    it("should delete a character", async () => {
        const res = await request(app).delete(`/api/characters/${characterId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.msg).toBe("Character removed");
    });
    
});