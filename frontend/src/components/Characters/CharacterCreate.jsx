// Import necessary hooks from React and react-router-dom
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Define the CharacterCreate component
function CharacterCreate({handleCreateCharacter, campaignsArray}) {

    // Use the navigate function from the react-router-dom library
    const Navigate = useNavigate()

    // Define the initial state for the character
    const initialState = {
        name: '',
        campaignIds: []
    }

    // Use React's useState hook to create a state variable for the character and a function to update it
    const [character, setCharacter] = useState(initialState)

    // Function to handle changes to the checkbox inputs
    const handleCheckboxChange = (event) => {
        
        // Get the campaign ID from the checkbox's value
        const campaignId = event.target.value;
        // Check if the checkbox is checked or not
        const isChecked = event.target.checked;
        
        // Update the character state
        setCharacter(prevCharacter => {
            // If the checkbox is checked, add the campaign ID to the array
            // If it's not checked, remove the campaign ID from the array
            const newCampaignIds = isChecked
            ? [...prevCharacter.campaignIds, campaignId]
            : prevCharacter.campaignIds.filter(id => id !== campaignId);
            // Return the new character state
            return {
                ...prevCharacter,
                campaignIds: newCampaignIds
            };
        });
    };

    // Function to handle changes to the other inputs
    const handleChange = (e) => {
        // Update the character state with the new input value
        setCharacter(prevCharacter => ({...prevCharacter, [e.target.name]: e.target.value}));
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
        // Prevent the default form submission behavior
        e.preventDefault()
        // Call the handleCreateCharacter function with the current character state
        handleCreateCharacter(character)
        // Reset the character state to the initial state
        setCharacter(initialState)
        // Navigate to the '/characters' route
        Navigate('/characters')
    }

    // Render the form
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

// Export the CharacterCreate component
export default CharacterCreate