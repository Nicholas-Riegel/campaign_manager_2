import React, { useState } from "react";

function CreateCharacter({ handleCreateCharacter }) {
    const [character, setCharacter] = useState({
        player: "",
        name: "",
        class: "",
        race: "",
        pronoun: "",
        level: 1,
        places: [],
        campaigns: [],
    });

    const handleChange = (e) => {
        setCharacter({
            ...character,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateCharacter(character);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a Character</h2>
            <input
                name="player"
                value={character.player}
                onChange={handleChange}
                placeholder="Player"
            />
            <input
                name="name"
                value={character.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                name="class"
                value={character.class}
                onChange={handleChange}
                placeholder="Class"
            />
            <input
                name="race"
                value={character.race}
                onChange={handleChange}
                placeholder="Race"
            />
            <input
                name="pronoun"
                value={character.pronoun}
                onChange={handleChange}
                placeholder="Pronoun"
            />
            <input
                type="number"
                name="level"
                value={character.level}
                onChange={handleChange}
                placeholder="Level"
            />
            <button type="submit">Create Character</button>
        </form>
    );
}

export default CreateCharacter;
