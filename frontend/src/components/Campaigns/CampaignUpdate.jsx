import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './CampaignUpdate.css'

function CampaignUpdate({campaignsArray, charactersArray, handleUpdateCampaign}) {

    const params = useParams()
    const initialState = {
        campaignName: '',
        campaignSystem: '',
        campaignCharacters: []
    };

    const [campaign, setCampaign] = useState(initialState)
    
    // This useEffect hook is used to set the campaign object when there are any changes to the campaignsArray or charactersArray or the campaignId in the URL. This is necessary to handle the case where the user refreshes the page; otherwise sometimes they get blank screen becase 'character' is not set.
    useEffect(() => {
        const selectedCampaign = campaignsArray.find(campaign => campaign._id === params.campaignId)
        setCampaign(selectedCampaign);
    }, [campaignsArray, charactersArray, params.campaignId]);
    
    // this is necessary to handle the case where the user refreshes the page; otherwise sometimes they get blank screen becase 'character' is not set
    if (!campaign) {
        return <p>Loading...</p>;
    }
    
    // handle changes to the input fields
    const handleChange = (e) => {
        setCampaign({...campaign, [e.target.name]: e.target.value})
    }
    
    // This function is used to handle changes to the checkbox inputs
    const handleCheckboxChange = (event) => {
                    
        // Extract the value and checked status from the event target (the checkbox input)
        const characterId = event.target.value;
        const isChecked = event.target.checked;
        
        // Use the setCampaign function to update the state (chatGPT helped me get this function right. I modified some of the variables it used.)
        setCampaign(prevCampaign => {
            const newCharacterIds = isChecked
                // If the checkbox is checked, add the character ID to the array
                ? [...prevCampaign.campaignCharacters, characterId]
                // If it's not checked, remove the character ID from the array
                : prevCampaign.campaignCharacters.filter(id => id !== characterId);
            // Return a new campaign object with the updated array
            return {
                ...prevCampaign,
                campaignCharacters: newCharacterIds
            };
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateCampaign(campaign)
        setCampaign(initialState)
    }

    return (
        <div id='campaign-update-wrapper'>
            <div id="campaign-update-div">
            <h1>Update Campaign</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="campaignName">Campaign Name:</label>
                <br />
                <input 
                    type="text"
                    name='campaignName'
                    id='campaignName'
                    onChange={handleChange}
                    value={campaign.campaignName} />
                <br />
                <label htmlFor="campaignSystem">Campaign System:</label>
                <br />
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
                <button type='submit'>Update</button>
            </form>
            </div>
        </div>
    )
}

export default CampaignUpdate