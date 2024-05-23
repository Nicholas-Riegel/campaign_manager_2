import React from "react";

function Characters({ characters, handleSelectCharacter }) {
  return (
    <div>
      <h2>Characters</h2>
      <ul>
        {characters.map((character) => (
          <li key={character._id} onClick={() => handleSelectCharacter(character)}>
            {character.name} - {character.class}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Characters;
