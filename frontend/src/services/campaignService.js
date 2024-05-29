// Base url: VITE_BACK_END_SERVER_URL in .env file
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/campaigns`;


// Fetch all campaigns
const index = async () => {
	try {
		const res = await fetch(BASE_URL);
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

// Create a new campaign
const create = async (campaign) => {
	try {
		const res = await fetch(BASE_URL, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(campaign),
		});
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

// Update a campaign
const updateCampaign = async (campaign, campainId) => {
	try {
		const res = await fetch(`${BASE_URL}/${campainId}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(campaign),
		});
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

// Delete a campaign
const deleteCampaign = async (campainId) => {
	try {
		const deletedPet = await fetch(`${BASE_URL}/${campainId}`, {
			method: 'DELETE',
			headers: {'Content-Type': 'application/json'},
		});
		return deletedPet;
	} catch (err) {
		console.log(err);
	}
}

// Export the functions
export { index, create, updateCampaign, deleteCampaign};