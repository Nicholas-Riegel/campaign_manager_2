import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

function CampaignUpdate({campaignsArray, charactersArray, handleUpdateCampaign}) {

    const params = useParams()
    const initialState = {
        name: '',
        system: '',
        characterIds: []
    };

    const [campaign, setCampaign] = useState(initialState)
    
    useEffect(() => {
        const selectedCampaign = campaignsArray.find(campaign => campaign._id === params.campaignId)
        setCampaign(selectedCampaign);
    }, [campaignsArray, charactersArray, params.campaignId]);
    
    // this is necessary to handle the case where the user refreshes the page; otherwise sometimes they get blank screen becase 'character' is not set
    if (!campaign) {
        return <p>Loading...</p>;
    }
    
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
        handleUpdateCampaign(campaign)
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
                <button type='submit'>Update</button>
            </form>
        </>
    )
}

export default CampaignUpdate