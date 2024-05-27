import { useState } from 'react'

function CharacterCreate({handleCreateCharacter, campaignsArray}) {

    const initialState = {
        name: '',
        campaignIds: []
    }

    const [character, setCharacter] = useState(initialState)

    const handleCheckboxChange = (event) => {
        
        const campaignId = event.target.value;
        const isChecked = event.target.checked;
        
        setCharacter(prevCharacter => {
            const newCampaignIds = isChecked
                ? [...prevCharacter.campaignIds, campaignId]
                : prevCharacter.campaignIds.filter(id => id !== campaignId);
            return {
                ...prevCharacter,
                campaignIds: newCampaignIds
            };
        });
    };

    const handleChange = (e) => {
        setCharacter(prevCharacter => ({...prevCharacter, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreateCharacter(character)
        setCharacter(initialState)
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
                {/* <fieldset>
                    <legend>Select Campaigns:</legend>
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
                <br /> */}
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default CharacterCreate