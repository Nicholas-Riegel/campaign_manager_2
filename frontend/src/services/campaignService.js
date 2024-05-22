const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/campaigns`;

const index = async () => {
	try {
		const res = await fetch(BASE_URL);
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

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
export { index, create, updateCampaign, deleteCampaign};