import { useState } from 'react'
import './CampaignCreate.css'

function CampaignCreate({handleCreateCampaign, charactersArray}) {

    const initialState = {
        campaignName: '',
        campaignSystem: '',
        campaignCharacters: []
    }

    const [campaign, setCampaign] = useState(initialState)

    const handleChange = (e) => {
        setCampaign({...campaign, [e.target.name]: e.target.value})
    }

    // This function is used to handle changes to the checkbox inputs
    const handleCheckboxChange = (event) => {
        
        // Extract the value and checked status from the event target (the checkbox input)
        const characterId = event.target.value;
        const isChecked = event.target.checked;
        
        // Use the setCampaign function to update the state (chatGPT helped me get this function right)
        setCampaign(prev => {
            const newCharacterIds = isChecked
                // If the checkbox is checked, add the character ID to the array
                ? [...prev.campaignCharacters, characterId]
                // If it's not checked, remove the character ID from the array
                : prev.campaignCharacters.filter(id => id !== characterId);
            // Return a new campaign object with the updated array
            return {
                ...prev,
                campaignCharacters: newCharacterIds
            };
        });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreateCampaign(campaign)
        setCampaign(initialState)
    }

    return (
        <div id='create-campaign-wrapper'>
            <h1>Create a New Campaign</h1>
            <div id='create-campaign-div'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="campaignName">Campaign Name:</label>
                    <input 
                        type="text"
                        name='campaignName'
                        id='campaignName'
                        onChange={handleChange}
                        value={campaign.campaignName} />
                    <br />
                    <label htmlFor="campaignSystem">Campaign System:</label>
                    <input 
                        type="text"
                        name='campaignSystem'
                        id='campaignSystem'
                        onChange={handleChange}
                        value={campaign.campaignSystem} />
                    <br />
                    <fieldset>
                        <legend>Select Characters:</legend>
                        {/* Map over the charactersArray and render a checkbox for each campaign */}
                        {charactersArray.map((character, i) => (
                            <div key={i} >
                            <label className='checkbox-label'>
                                <input 
                                    type="checkbox" 
                                    value={character._id}
                                    checked={campaign.campaignCharacters.includes(character._id)}
                                    onChange={handleCheckboxChange}/>
                                {character.characterName}
                            </label>
                            </div>
                        ))}
                    </fieldset>
                    <br />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CampaignCreate