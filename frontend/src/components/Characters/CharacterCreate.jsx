import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Define the CharacterCreate component
function CharacterCreate({handleCreateCharacter, campaignsArray}) {

    // useNavigate to navigate back to the '/characters' route after form submission
    const Navigate = useNavigate()

    // Define the initial state for the character
    const initialState = {
        name: '',
        campaignIds: []
    }

    // Create a state variable for the character
    const [character, setCharacter] = useState(initialState)

    // Handle changes to the checkbox inputs
    const handleCheckboxChange = (event) => {
        
        // Get the campaign ID from the checkbox's value
        const campaignId = event.target.value;
        // Check if the checkbox is checked or not
        const isChecked = event.target.checked;
        
        // Update the character state
        setCharacter(prevCharacter => {
            const newCampaignIds = isChecked
                // If the checkbox is checked, add the campaign ID to the array
                ? [...prevCharacter.campaignIds, campaignId]
                // If it's not checked, remove the campaign ID from the array
                : prevCharacter.campaignIds.filter(id => id !== campaignId);
            // Return the new character state
            return {
                ...prevCharacter,
                campaignIds: newCampaignIds
            };
        });
    };

    // Handle changes to the other inputs
    const handleChange = (e) => {
        // Update the character state with the new input value
        setCharacter(prevCharacter => ({...prevCharacter, [e.target.name]: e.target.value}));
    }

    // Handle form submission
    const handleSubmit = (e) => {
        // Prevent page refresh
        e.preventDefault()
        // Call the handleCreateCharacter function with the current character state
        handleCreateCharacter(character)
        // Reset the character state to the initial state
        setCharacter(initialState)
        // Navigate to the '/characters' route
        Navigate('/characters')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Character Name:</label>
                <input 
                    type="text"
                    name='name'
                    id='name'
                    onChange={handleChange}
                    value={character.name} />
                <br />
                <fieldset>
                    <legend>Select Campaigns:</legend>
                    {/* Map over the campaignsArray and render a checkbox for each campaign */}
                    {campaignsArray.map((campaign, i) => (
                        <div key={i}>
                        <label>
                            <input 
                                type="checkbox" 
                                value={campaign._id}
                                checked={character.campaignIds.includes(campaign._id)}
                                onChange={handleCheckboxChange}/>
                            {campaign.name}
                        </label>
                        </div>
                    ))}
                </fieldset>
                <br />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default CharacterCreate