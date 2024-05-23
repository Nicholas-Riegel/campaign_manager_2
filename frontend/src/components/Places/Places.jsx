import React from "react";

function Places({ places, handleSelectPlace }) {
  return (
    <div>
      <h2>Places</h2>
      <ul>
        {places.map((place) => (
          <li key={place._id} onClick={() => handleSelectPlace(place)}>
            {place.name} - {place.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Places;
