const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api`;

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
  }
  return res.json();
};

const indexCampaigns = async () => {
  const url = `${BASE_URL}/campaigns`;
  console.log(`Fetching campaigns from: ${url}`);
  try {
    const res = await fetch(url);
    return handleResponse(res);
  } catch (err) {
    console.error('Error fetching campaigns:', err);
  }
};

const createCampaign = async (campaign) => {
  try {
    const res = await fetch(`${BASE_URL}/campaigns`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(campaign),
    });
    return handleResponse(res);
  } catch (err) {
    console.error('Error creating campaign:', err);
  }
};

const updateCampaign = async (campaign, campaignId) => {
  try {
    const res = await fetch(`${BASE_URL}/campaigns/${campaignId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(campaign),
    });
    return handleResponse(res);
  } catch (err) {
    console.error('Error updating campaign:', err);
  }
};

const deleteCampaign = async (campaignId) => {
  try {
    const res = await fetch(`${BASE_URL}/campaigns/${campaignId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    });
    return handleResponse(res);
  } catch (err) {
    console.error('Error deleting campaign:', err);
  }
};

const indexCharacters = async () => {
  const url = `${BASE_URL}/characters`;
  console.log(`Fetching characters from: ${url}`);
  try {
    const res = await fetch(url);
    return handleResponse(res);
  } catch (err) {
    console.error('Error fetching characters:', err);
  }
};

const indexPlaces = async () => {
  const url = `${BASE_URL}/places`;
  console.log(`Fetching places from: ${url}`);
  try {
    const res = await fetch(url);
    return handleResponse(res);
  } catch (err) {
    console.error('Error fetching places:', err);
  }
};

const createPlace = async (place) => {
  try {
    const res = await fetch(`${BASE_URL}/places`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(place),
    });
    return handleResponse(res);
  } catch (err) {
    console.error('Error creating place:', err);
  }
};

const createCharacter = async (character) => {
  try {
    const res = await fetch(`${BASE_URL}/characters`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(character),
    });
    return handleResponse(res);
  } catch (err) {
    console.error('Error creating character:', err);
  }
};

export {
  indexCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  indexCharacters,
  indexPlaces,
  createPlace,
  createCharacter
};
