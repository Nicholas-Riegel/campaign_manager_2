const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api`;

// Campaign services
const indexCampaigns = async () => {
	try {
		const res = await fetch(`${BASE_URL}/campaigns`);
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

const createCampaign = async (campaign) => {
	try {
		const res = await fetch(`${BASE_URL}/campaigns`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(campaign),
		});
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

const updateCampaign = async (campaign, campaignId) => {
	try {
		const res = await fetch(`${BASE_URL}/campaigns/${campaignId}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(campaign),
		});
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

const deleteCampaign = async (campaignId) => {
	try {
		const res = await fetch(`${BASE_URL}/campaigns/${campaignId}`, {
			method: 'DELETE',
			headers: {'Content-Type': 'application/json'},
		});
		return res;
	} catch (err) {
		console.log(err);
	}
};

// Place services
const createPlace = async (place) => {
	try {
		const res = await fetch(`${BASE_URL}/places`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(place),
		});
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

// Character services
const createCharacter = async (character) => {
	try {
		const res = await fetch(`${BASE_URL}/characters`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(character),
		});
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

export {
	indexCampaigns,
	createCampaign,
	updateCampaign,
	deleteCampaign,
	createPlace,
	createCharacter
};
