// Base url: VITE_BACK_END_SERVER_URL in .env file
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/characters`;

// Fetch all characters
const index = async () => {
	try {
		const res = await fetch(BASE_URL);
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

// Create a new character
const create = async (character) => {
	try {
		const res = await fetch(BASE_URL, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(character),
		});
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

// Update a character
const updateCharacter = async (character, characterId) => {
	try {
		const res = await fetch(`${BASE_URL}/${characterId}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(character),
		});
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

// Delete a character
const deleteCharacter = async (characterId) => {
	try {
		const deletedPet = await fetch(`${BASE_URL}/${characterId}`, {
			method: 'DELETE',
			headers: {'Content-Type': 'application/json'},
		});
		return deletedPet;
	} catch (err) {
		console.log(err);
	}
}

// Export the functions
export { index, create, updateCharacter, deleteCharacter};