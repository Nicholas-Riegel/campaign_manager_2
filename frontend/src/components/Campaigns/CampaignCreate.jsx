import { useState } from 'react'

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

    const handleCheckboxChange = (event) => {
            
        const characterId = event.target.value;
        const isChecked = event.target.checked;
        
        setCampaign(prevCampaign => {
            const newCharacterIds = isChecked
                ? [...prevCampaign.campaignCharacters, characterId]
                : prevCampaign.campaignCharacters.filter(id => id !== characterId);
            return {
                ...prevCampaign,
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
        <>
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
                        <div key={i}>
                        <label>
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
        </>
    )
}

export default CampaignCreate