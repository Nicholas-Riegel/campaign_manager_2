import { useState } from "react";

function CreatePlace({ handleCreatePlace }) {
    const [place, setPlace] = useState({
        name: "",
        type: "",
        charactersPresent: [],
        campaign: null,
    });

    const handleChange = (e) => {
        setPlace({
            ...place,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreatePlace(place);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a Place</h2>
            <input
                name="name"
                value={place.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                name="type"
                value={place.type}
                onChange={handleChange}
                placeholder="Type"
            />
            <button type="submit">Create Place</button>
        </form>
    );
}

export default CreatePlace;
