import { useState } from 'react'

function CampaignCreate({handleCreateCampaign, charactersArray}) {

    const initialState = {
        name: '',
        system: '',
        characterIds: []
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
                ? [...prevCampaign.characterIds, characterId]
                : prevCampaign.characterIds.filter(id => id !== characterId);
            return {
                ...prevCampaign,
                characterIds: newCharacterIds
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
                <label htmlFor="name">Campaign Name:</label>
                <input 
                    type="text"
                    name='name'
                    id='name'
                    onChange={handleChange}
                    value={campaign.name} />
                <br />
                <label htmlFor="system">Campaign System:</label>
                <input 
                    type="text"
                    name='system'
                    id='system'
                    onChange={handleChange}
                    value={campaign.system} />
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
                                checked={campaign.characterIds.includes(character._id)}
                                onChange={handleCheckboxChange}/>
                            {character.name}
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